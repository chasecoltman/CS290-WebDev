function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(includeType) {
        if( typeof includeType === 'undefined' ) {
            includeType = false;
        }
        
        var printString = this.year + " " + this.make + " " + this.model + " ";
        if(includeType) {
            printString += this.type;
        }
        console.log(printString);   
    }
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, inArr ){
    /*your code here*/
    var partition = function(array, low, high) {
        var pivot = array[low];
        var i = low - 1;
        var j = high + 1;
        while( true ) {
            
            do {
                j--;
            } while( comparator(array[j], pivot) );
            
            do {
                i++;
            } while( comparator(pivot, array[i]) );
           
            if ( i < j ) {
                var tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            } else {
                return j;
            }
        }
    }
    var quicksort = function(array, low, high) {
        if ( low < high ) {
            var part = partition(array, low, high);
            quicksort(array, low, part);
            quicksort(array, (part + 1), high);
        }
    }
    
    quicksort(inArr, 0, (inArr.length - 1));
    
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year) {
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    var auto1String = auto1.make.toLowerCase();
    var auto2String = auto2.make.toLowerCase();
    
    /* I know you said no loops in the functions, but you really want to compare each letter until you find a difference, not just the first */
    var cmpPos = 0;
    while(auto1String.charCodeAt(cmpPos) === auto2String.charCodeAt(cmpPos)) {
        cmpPos++;
    }
    
    if( auto1String.charCodeAt(cmpPos) < auto2String.charCodeAt(cmpPos) ) {
        return true;
    } else {
        return false;
    }
    
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2 ){
    var getPriority = function(auto) {
        switch(auto.type.toLowerCase()) {
            case 'roadster':
                return 1;
            case 'pickup':
                return 2;
            case 'suv':
                return 3;
            case 'wagon':
                return 4;
            default:
                return 5;
        }
    }
    if( getPriority(auto1) < getPriority(auto2) ) {
        return true;
    } else {
        return false;
    }
}

function printArray( array, showType, header ) {
    
    if( typeof header === 'string' ) {
        console.log(header);
    } 
    
    for( var i = 0; i < array.length; i++ )
    {
        array[i].logMe(showType);
    }
    
    console.log('');
}

console.log("*****");

sortArr( yearComparator, automobiles);
printArray(automobiles.reverse(), false, "The cars sorted by year are: ");

sortArr( makeComparator, automobiles);
printArray(automobiles.reverse(), false, "The cars sorted by make are: ");

sortArr( typeComparator, automobiles);
printArray(automobiles.reverse(), true, "The cars sorted by type are: ");

console.log("*****");