var futballGame=function(){
    var self=this;
    this.options={
        height:500,
        width:680,
        goalHeight:188,
        goalRight:50,
        goalWidth:50,
        minRange:600,
        minX:50,
        minY:100,
        mindelay:1000,
        maxdelay:5000,
        minballSpeed:70,
        maxballSpeed:150,
        errorPercent:1.25,
        goalieHeight:60
    }
    this.height=500;

    this.shotsTaken=0;
    this.shotsMissed=0;
    this.ball=new futball();
    this.goaltender=new goalie(this.options.goalHeight/2-this.options.goalieHeight/2,0,this.options.goalHeight-this.options.goalieHeight);
    this.initialize=function(){

    };

    this.update=function(){

        return 0;

    };

    this.initialize();

}

var goalie=function(yPos,minY,maxY){
    var self=this;
    this.Position=yPos;
    this.minY=minY;
    this.maxY=maxY;
    this.initialize=function()
    {

    };

    this.setPosition=function(yPos){
        if (yPos<self.minY)
        {
            self.Position=self.minY;
        }
        else if (yPos>self.maxY){
            self.Position=self.maxY;
        }
        else
        {
            self.Position=yPos;
        }
    };

    this.incrementPosition=function(amount){
        self.setPosition(self.Position+amount);

    };
    
    this.initialize();
}

var futball=function(){
    var self=this;
    this.angle=0;
    this.speed=0;
    this.xPos=0;
    this.yPos=0;
    this.initialize=function(){
        self.angle=0;
        self.speed=0;
        self.xPos=0;
        self.yPos=0;
    };
    this.positionBall=function(x,y){
        self.xPos=x;
        self.yPos=y;
    };
    this.setTrajectory=function(angle,speed)
    {
        self.angle=angle;
        self.speed=speed;
    };

    this.initialize();
}
