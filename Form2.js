class Form2 {

    constructor() {
        this.input = createInput("Name");
        this.button = createButton('Play');
        this.title2 = createElement('h2');
        this.title3 = createElement('h2');
        this.title = createElement('h2');
      
        
      }
      hide(){
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
      }i
    
      display(){
        background(bg2);
        
        this.title.html("Saving Earth!");
        this.title2.html("Our planet is attacked by aliens!")
         this.title3.html("You are on a mission to save it!")
        
        this.title.position(550, 0);
        this.title2.position(470,60);
        this.title3.position(490,100);
        this.input.position(540,350);
        this.button.position(610,400);
     
  
      this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        this.title.hide();
        this.title2.hide();
        this.title3.hide();
        player2name = this.input.value();
        console.log(player2name);
        gameState=2;
       
      });
  
    
    }
  }
  