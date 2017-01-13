
SuDaVi.service("sudavicode",function(){
    this.core = {
        errorColletion : ["Invalid size on element"],
        maxLength : 9,
        Attempts : 0,
        init: function(){
            var isValid = this.isValidateTemplate()
            if(isValid.result)
            {
                //console.log(isValid.message);
                this.solveSudoku(isValid.template);
                this.initUserMatrix();
                this.Attempts = 0;
            }
        },
        getAttempts : function(){
            return this.Attempts;
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
            var timeout = 999;
            while(!this.isDone(weights) && !getout){
                for(var x = 0; x < this.maxLength; x++)
                {
                    for(var y = 0; y < this.maxLength; y++)
                    {
                        for(var i = 1; i <= this.maxLength; i++)
                        {
                            if(x == 0 && y == 3 && i == 1)
                            {
                                var rere = "";
                            }
                            var canBe = this.CanBeInVertical(y,template,i);
                            canBe = canBe && this.CanBeInHorizontal(x,template,i);
                            canBe = canBe && this.CanBeInBox(x,y,template,i);

                            if(weights[x][y].w != -1 && canBe)
                            {
                                weights[x][y].w++;
                                weights[x][y].t = i;
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
            //console.log("Result");
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
        CanBeInHorizontal : function(x, template, number){
            for(var i = 0; i < this.maxLength; i++){
                if(template[x][i].n == number)
                {
                    return false;
                }
            }
            return true;
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
                //console.log(result);
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
            return isOk;
        },
        getSolutionMatrix : function(){
            return this.result;
        }
    };
});
