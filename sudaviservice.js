
SuDaVi.service("sudavicode",function(){
    this.core = {
        errorColletion : ["Invalid size on element"],
        maxLength : 9,
        init: function(){
            // var isValid = this.isValidateTemplate()
            // if(isValid.result)
            // {
            //     console.log(isValid.message);
            //     this.solveSudoku(isValid.template);
            // }
        },
        getTemplate : function (){
            var template = [[6,-1,4,-1,8,3,-1,-1,7],
                            [3,9,7,5,4,1,-1,6,2],
                            [-1,8,-1,-1,7,-1,5,-1,-1],
                            [-1,6,1,-1,-1,-1,4,2,3],
                            [-1,3,8,1,2,6,9,-1,5],
                            [9,2,-1,-1,3,7,-1,1,8],
                            [-1,-1,-1,-1,-1,4,-1,-1,-1],
                            [2,4,9,-1,1,8,-1,5,6],
                            [-1,7,-1,9,5,2,3,-1,1]];

            return template;
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
            var weights = this.buildWeights(template);
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
                            var canBe = this.CanBeInVertical(y,template,i) ||
                                        this.CanBeInHorizontal(x,template,i) ||
                                        this.CanBeInBox(x,y,template,i);

                            if(weights[x][y] != -1 && canBe)
                            {
                                weights[x][y]++;
                            }
                        }
                    }
                }
                this.resetWeights(weights);
                timeout--;
                getout = timeout <= 0 ? true : false;
            }
        },
        CanBeInVertical : function(y, template, number){
            for(var i = 0; i < this.maxLength; i++){
                if(template[i][y] == number)
                {
                    return false;
                }
            }
            return true;
        },
        CanBeInHorizontal : function(x, template, number){
            for(var i = 0; i < this.maxLength; i++){
                if(template[x][i] == number)
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
                    if(template[x][i] == number)
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
            box.x = xResult <= 1 ? 0 : xResult <= 2 ? 1 : xResult <= 3 ? 2 : -1;
            box.y = yResult <= 1 ? 0 : yResult <= 2 ? 1 : yResult <= 3 ? 2 : -1;

            return box;
        },
        resetWeights : function(weights)
        {
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    if(weights[x][y] == 1)
                    {
                        weights[x][y] = -1;
                    }
                    else if(weights[x][y] != -1)
                    {
                        weights[x][y] = 0;
                    }
                }
            }
        },
        buildWeights : function(weights)
        {
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    if(weights[x][y] != -1)
                    {
                        weights[x][y] = -1;
                    }
                    else if(weights[x][y] == -1)
                    {
                        weights[x][y] = 0;
                    }
                }
            }
        },
        printMatrix : function(matrix)
        {
            var result = "";
            for(var x = 0; x < this.maxLength; x++)
            {
                for(var y = 0; y < this.maxLength; y++)
                {
                    result +=  matrix[x][y] + " ";
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
                    if(weights[x][y] != -1)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    };
});
