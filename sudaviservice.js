
SuDaVi.service("sudavicode",function(){
    this.core = {
        errorColletion : ["Invalid size on element"],
        maxLength : 9,
        Attempts : 0,
        insults: ["Really??",
                    "Please, use your brain a little",
                    "Your mom is getting ashamed",
                    "Even Joshua is better than you...",
                    "You're embarrassing yourself",
                    "Delwar, is it you playing?",
                    "Ok, time to click the Solution button",
                    "Some day you will find yourself and wish you hadn't",
                    "I hope HR won't see your score",
                    "Are you always this stupid or are you making a special effort today?",
                    "One more mistake and you'll get a black eye like Viraj"],
        init: function(){
            var isValid = this.isValidateTemplate()
            if(isValid.result)
            {
                console.log(isValid.message);
                this.solveSudoku(isValid.template);
                this.initUserMatrix();
                this.Attempts = 0;
            }
        },
        getAttempts : function(){
            return this.Attempts;
        },
        getInsults : function(){
            return this.insults;
        },
        getTemplate : function (){
            //w: -1 => do nothing
            //w: 0 => look for number
            var template = [[{n:6,w:-1},{n:-1, w:0},{n:4, w:-1},{n:-1,w: 0},{n:8,w:-1},{n:3,w:-1},{n:-1, w:0},{n:-1, w:0},{n:7,w:-1}],
                            [{n:3,w:-1},{n:9,w:-1},{n:7,w:-1},{n:5,w:-1},{n:4,w:-1},{n:1,w:-1},{n:-1, w:0},{n:6,w:-1},{n:2,w:-1}],
                            [{n:-1, w:0},{n:8,w:-1},{n:-1, w:0},{n:-1, w:0},{n:7,w:-1},{n:-1, w:0},{n:5,w:-1},{n:-1, w:0},{n:-1, w:0}],
                            [{n:-1, w:0},{n:6,w:-1},{n:1,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:4,w:-1},{n:2,w:-1},{n:3,w:-1}],
                            [{n:-1, w:0},{n:3,w:-1},{n:8,w:-1},{n:1,w:-1},{n:2,w:-1},{n:6,w:-1},{n:9,w:-1},{n:-1, w:0},{n:5,w:-1}],
                            [{n:9,w:-1},{n:2,w:-1},{n:-1, w:0},{n:-1, w:0},{n:3,w:-1},{n:7,w:-1},{n:-1, w:0},{n:1,w:-1},{n:8,w:-1}],
                            [{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:4,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0}],
                            [{n:2,w:-1},{n:4,w:-1},{n:9,w:-1},{n:-1, w:0},{n:1,w:-1},{n:8,w:-1},{n:-1, w:0},{n:5,w:-1},{n:6,w:-1}],
                            [{n:-1, w:0},{n:7,w:-1},{n:-1, w:0},{n:9,w:-1},{n:5,w:-1},{n:2,w:-1},{n:3,w:-1},{n:-1, w:0},{n:1,w:-1}]];

            /*template = [[{n:8,w:-1},{n:9, w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:4, w:-1},{n:-1, w:0},{n:-1, w:0}],
                            [{n:-1, w:0},{n:-1, w:0},{n:7,w:-1},{n:1,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:6,w:-1},{n:-1, w:0}],
                            [{n:-1, w:0},{n:6,w:-1},{n:-1, w:0},{n:-1, w:0},{n:4,w:-1},{n:3, w:-1},{n:-1, w:0},{n:-1, w:0},{n:5, w:-1}],
                            [{n:-1, w:0},{n:-1, w:0},{n:6,w:-1},{n:-1, w:0},{n:-1, w:0},{n:8, w:-1},{n:9,w:-1},{n:-1, w:0},{n:-1, w:0}],
                            [{n:3, w:-1},{n:-1, w:0},{n:9,w:-1},{n:7,w:-1},{n:6,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0}],
                            [{n:5,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:6, w:-1},{n:7,w:-1},{n:2,w:-1}],
                            [{n:-1, w:0},{n:7, w:-1},{n:-1, w:0},{n:-1, w:0},{n:5, w:-1},{n:1,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0}],
                            [{n:-1, w:0},{n:1,w:-1},{n:-1, w:0},{n:4, w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:2,w:-1},{n:7,w:-1}],
                            [{n:9, w:-1},{n:-1, w:0},{n:3, w:-1},{n:-1, w:0},{n:-1, w:0},{n:6,w:-1},{n:-1, w:0},{n:-1, w:0},{n:1,w:-1}]];*/

            /*template = [[{n:5,w:-1},{n:3, w:-1},{n:1, w:-1},{n:7,w: -1},{n:8,w:-1},{n:-1,w:0},{n:-1, w:0},{n:4, w:-1},{n:-1,w:0}],
                            [{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:6, w:-1},{n:-1,w:0},{n:-1,w:0}],
                            [{n:-1, w:0},{n:-1,w:0},{n:-1, w:0},{n:3, w:-1},{n:1,w:-1},{n:2, w:-1},{n:-1,w:0},{n:-1, w:0},{n:-1, w:0}],
                            [{n:1, w:-1},{n:8,w:-1},{n:9,w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1,w:0},{n:-1,w:0},{n:2,w:-1}],
                            [{n:-1, w:0},{n:2,w:-1},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1, w:0},{n:6,w:-1}],                           
                            [{n:-1,w:0},{n:-1,w:0},{n:-1, w:0},{n:-1, w:0},{n:3,w:-1},{n:9,w:-1},{n:-1, w:0},{n:-1,w:0},{n:-1,w:0}],
                            [{n:6, w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1,w:0},{n:-1, w:0},{n:2, w:-1},{n:7, w:-1}],
                            [{n:8,w:-1},{n:-1,w:0},{n:-1,w:0},{n:-1, w:0},{n:-1,w:0},{n:-1,w:0},{n:9, w:-1},{n:-1,w:0},{n:5,w:-1}],
                            [{n:-1, w:0},{n:-1,w:0},{n:-1, w:0},{n:-1,w:0},{n:5,w:-1},{n:8,w:-1},{n:-1,w:0},{n:-1, w:0},{n:4,w:-1}]];*/

            /*template = [[{n:-1,w:0},{n:3, w:-1},{n:5, w:-1},{n:-1,w: 0},{n:-1,w:0},{n:-1,w:0},{n:-1, w:0},{n:-1, w:-0},{n:6,w:-1}],
                        [{n:1,w:-1},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1, w:0},{n:-1,w:0},{n:7,w:-1}],
                        [{n:4, w:-1},{n:-1,w:0},{n:7, w:-1},{n:-1, w:0},{n:-1,w:0},{n:1, w:-1},{n:3,w:-1},{n:5, w:-1},{n:9, w:-1}],
                        [{n:-1, w:0},{n:2,w:-1},{n:-1,w:0},{n:-1, w:0},{n:8, w:-1},{n:9, w:-1},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0}],
                        [{n:3, w:-1},{n:9,w:-1},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:1,w:-1},{n:-1, w:0},{n:-1,w:0}],
                        [{n:-1,w:0},{n:-1,w:0},{n:1, w:-1},{n:-1, w:0},{n:-1,w:0},{n:3,w:-1},{n:-1, w:0},{n:-1,w:0},{n:-1,w:0}],
                        [{n:8, w:-1},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1, w:0},{n:-1,w:0},{n:9, w:-1},{n:2, w:-1},{n:-1, w:0}],
                        [{n:2,w:-1},{n:1,w:-1},{n:-1,w:0},{n:-1, w:0},{n:-1,w:0},{n:7,w:-1},{n:6, w:-1},{n:3,w:-1},{n:4,w:-1}],
                        [{n:-1, w:0},{n:-1,w:0},{n:-1, w:0},{n:6,w:-1},{n:-1,w:0},{n:-1,w:0},{n:-1,w:0},{n:7, w:-1},{n:-1,w:0}]];*/

            return this.buildWeightsAndXY(template);
        },
        initUserMatrix : function() {
            var template = this.getTemplate();
            //clone template
            this.userMatrix = template.slice(0);
            this.userMatrix = this.buildWeightsAndXY(template);
        },
        getUserMatrix : function(){
            return  this.userMatrix;
        },
        isValidateTemplate: function(){
            var template = this.getTemplate();

            if(template.length != 9){
                return {result : true, message : errorColletion[0]};
            }

            for(var i = 0; i < this.maxLength; i++)
            {
                if(template[i].length != 9)
                {
                    return {result : true, message : errorColletion[0]};
                }
            }
            return {result : true, message : "Ok", template: template};
        },
        solveSudoku : function(template){
            var weights = this.buildWeightsAndXY(template);
            this.printMatrix(weights);
            var getout = false;
            var timeout = 9999;
            while(!this.isDone(weights) && !getout){
                for(var x = 0; x < this.maxLength; x++)
                {
                    for(var y = 0; y < this.maxLength; y++)
                    {
                        for(var i = 1; i <= this.maxLength; i++)
                        {
                            var canBe = this.CanBeInVertical(y,template,i);
                            canBe = canBe && this.CanBeInHorizontal(x,template,i);
                            canBe = canBe && this.CanBeInBox(x,y,template,i);

                            if(x == 0 && y == 6 && i == 2)
                            {
                                var fff="";
                            }

                            if(canBe){
                                var canBeInOtherFieldInBox = this.CanBeInOtherFieldInBox(x,y,template,i);

                                if(canBeInOtherFieldInBox){
                                    cannotBeElsewhere = this.IAmTheOnlyOneMissing(x,y,template);
                                }

                                if(!canBeInOtherFieldInBox){
                                    weights[x][y].w = -1;
                                    weights[x][y].n = i;
                                }
                                else if(weights[x][y].w != -1 && canBe)
                                {
                                    weights[x][y].w++;
                                    weights[x][y].t = i;
                                }
                            }
                        }
                    }
                }
                this.resetWeights(weights);
                timeout--;
                getout = timeout <= 0 ? true : false;
                if(getout){
                    var xgfgf = "";
                }
            }
            console.log("Result");
            this.printMatrix(weights);
            this.result = weights;
        },
        CanBeInVertical : function(y, template, number){
            for(var i = 0; i < this.maxLength; i++){
                if(template[i][y].n == number)
                {
                    return false;
                }
            }
            return true;
        },
        GetNumberOfFieldFilledInVertical : function(y, template){
            var result = 0;
            for(var i = 0; i < this.maxLength; i++){
                if(template[i][y].n != -1)
                {
                    result++;
                }
            }
            return result;
        },
        CanBeInHorizontal : function(x, template, number){
            for(var i = 0; i < this.maxLength; i++){
                if(template[x][i].n == number)
                {
                    return false;
                }
            }
            return true;
        },
        GetNumberOfFieldFilledInHorizontal : function(x, template){
            var result = 0;
            for(var i = 0; i < this.maxLength; i++){
                if(template[x][i].n == -1)
                {
                     result++;
                }
            }
            return  result;
        },
        CanBeInBox : function(x, y, template, number){

            var box = this.GetBoxNumber(x,y);

            for(var i = box.x; i < box.x + 3; i++)
            {
                for(var j = box.y; j < box.y + 3; j++)
                {
                    if(template[i][j].n == number)
                    {
                        return false;
                    }
                }
            }
            return true;
        },
        CanBeInOtherFieldInBox : function (x,y,template,number)
        {
            var box = this.GetBoxNumber(x,y);

            var canBe = false;
            for(var i = box.x; i < box.x + 3; i++)
            {
                for(var j = box.y; j < box.y + 3; j++)
                {
                    if(x == i && y == j)
                        continue;

                    var canBe = this.CanBeInVertical(j,template,number);
                        canBe = canBe && this.CanBeInHorizontal(i,template,number)
                        canBe = canBe && template[i][j].n == -1;
                    
                    if(canBe){
                        return canBe;
                    }
                }
            }
            return canBe;
        },
        IAmTheOnlyOneMissing : function(x,y,template){
            var resultVertical = this.GetNumberOfFieldFilledInVertical(y,template);
            var resultHorizontal = this.GetNumberOfFieldFilledInHorizontal(x,template);
            if(resultVertical == 1 || resultHorizontal == 1)
            {
                return true;
            }
            return false;
        },
        GetBoxNumber : function(x,y){
            var xResult = x/3;
            var yResult = y/3;

            var box = {x: -1, y: -1};
            box.x = xResult < 1 ? 0 : xResult < 2 ? 3 : xResult < 3 ? 6 : -1;
            box.y = yResult < 1 ? 0 : yResult < 2 ? 3 : yResult < 3 ? 6 : -1;

            return box;
        },
        resetWeights : function(weights, template)
        {
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    if(x == 0 && y == 3)
                    {
                        var xxxxxxsd = "";
                    }
                    if(weights[x][y].w == 1)
                    {
                        weights[x][y].w = -1;
                        weights[x][y].n = weights[x][y].t;
                    }
                    else if(weights[x][y].w != -1)
                    {
                        weights[x][y].w = 0;
                        weights[x][y].n = -1;
                    }
                    weights[x][y].t = null;
                }
            }
        },
        buildWeightsAndXY : function(weights)
        {
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    weights[x][y].x = x;
                    weights[x][y].y = y;

                    if(weights[x][y].w != -1)
                    {
                        weights[x][y].w = -1;
                    }
                    else if(weights[x][y].w == -1)
                    {
                        weights[x][y].w = 0;
                    }
                }
            }
            return weights;
        },
        printMatrix : function(matrix)
        {
            var result = "";
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    result +=  " ("+x+","+y+")( " + matrix[x][y].n + " | " +  matrix[x][y].w  + " ) ";
                }
                console.log(result);
                result = "";
            }
        },
        isDone : function(weights)
        {
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    if(weights[x][y].w == -1)
                    {
                        return false;
                    }
                }
            }
            return true;
        },
        isValidNumberInXY : function(x,y,number){
            var isOk = this.result[x][y].n == number;
            if(isOk){
                this.userMatrix[x][y].n = number;
                this.userMatrix[x][y].w = -1;
            }else{
                this.Attempts++;
            }
        },
        getSolutionMatrix : function(){
            return this.result;
        }
    };
});
