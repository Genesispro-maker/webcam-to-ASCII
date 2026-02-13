const canvas = document.querySelector("canvas")
        const slider = document.querySelector("input[type = range]")
        const videoElement = document.querySelector("video")
        const span = document.querySelector("span")
        const btn = document.querySelector("button")

        slider.addEventListener("input", (e) => {
            span.textContent = `${e.target.value}x`
        })



        const ctx = canvas.getContext("2d", {willReadFrequently: true})
        
         class gridCell {
            constructor(x, y, symbol, color){
                this.x = x
                this.y = y
                this.symbol = symbol
                this.color = color
            }

            draw(ctx){
                ctx.fillStyle = this.color
                ctx.fillText(this.symbol, this.x, this.y)

            }
         }


         class AsciiEffect {
            #imageCellArray= []
            #symbols = []
            #pixels = []
            #ctx
            #height
            #width

            constructor(ctx, width, height){
                this.#ctx = ctx
                this.#width = width
                this.#height = height
                this.#ctx.drawImage(videoElement, 0, 0, this.#width, this.#height)
                this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height)
                console.log(this.#pixels.data)
            }

            
            #convertToSymbol(g){
                if(g > 250) return "@"
                else if(g < 240) return "*"
                else if(g < 220) return "+"
                else if(g < 200) return "#"
                else if(g < 180) return "&"
                else if(g < 160) return "%"
                else if(g < 140) return "_"
                else if(g < 120) return ":"
                else if(g < 100) return "$"
                else if(g < 80) return "/"
                else if(g < 60) return "-"
                else if(g < 40) return "X"
                else if(g < 20) return "W"
                else return ""
            }

            #scanImage(cellSize){
                this.#imageCellArray = []
                for(let y = 0; y < this.#pixels.height; y += cellSize){
                    for(let x = 0; x < this.#pixels.width; x += cellSize){
                        const X = x * 4
                        const Y = y * 4
                        const currentPosition = (Y * this.#pixels.width) + X

                        if(this.#pixels.data[currentPosition + 3] > 128){
                            const red = this.#pixels.data[currentPosition]
                            const green = this.#pixels.data[currentPosition + 1]
                            const blue = this.#pixels.data[currentPosition + 2]

                            const total = red + green + blue
                            const average = total / 3
                            const color = "rgb(" + red + "," + green +"," + blue + ")"
                            const symbol = this.#convertToSymbol(average)
                            if(total > 50) this.#imageCellArray.push(new gridCell(x, y, symbol, color))
                       }
                    }
                }

                console.log(this.#imageCellArray)

            }

            #drawAscii(){
                this.#ctx.clearRect(0, 0, this.#width, this.#height)
                for(let i = 0; i < this.#imageCellArray.length; i++){
                    this.#imageCellArray[i].draw(this.#ctx)
                }
            }

         draw(cellSize){
             this.#ctx.drawImage(videoElement, 0, 0, this.#width, this.#height)
             this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height)
         
             this.#scanImage(cellSize)
             this.#drawAscii()
       }

}
           let effect;
           
           async function startCamera() {
               const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
               videoElement.srcObject = stream;
           
               await new Promise(resolve => videoElement.onloadedmetadata = resolve);
               await new Promise(resolve => videoElement.onplaying = resolve);
           
               canvas.width = videoElement.videoWidth;
               canvas.height = videoElement.videoHeight;
           
               effect = new AsciiEffect(ctx, canvas.width, canvas.height);
           
               requestAnimationFrame(animateAscii);
           }
           
           function animateAscii() {
               effect.draw(Number(slider.value));
               requestAnimationFrame(animateAscii);
           }
           
           btn.addEventListener("click", () => {
            startCamera()
           })