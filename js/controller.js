/**
 * Created by Hansani Kariyawasam on 29-Aug-17.
 */
document.getElementById('audio').play();
var coloumn = ['A','B','C','D','E','F','G','H'];
var row = [1,2,3,4,5,6,7,8];
var previous=[];
var pieceID="";
var pieceClass="";
var isSelected=false;
var lastLetterOFGridPos=0;
var firstLetterOFGridPos=0;
var prePieceID="";
var proName='';
var isCorrect=true;
var proArray=['A8','B8','C8','E8','F8','G8','H8','A1','B1','C1','D1','E1','F1','G1','H1'];

$('#chessboard').children('div').click(function () {
    pieceID=$(this).children('img').attr('id'); //get the select chess piece id

    var cellID= $(this).attr('id'); //get the select chess piece parent id Ex :A5
    var imageClone = $('#'+cellID).children('img').clone();


    if(!isSelected){
        clearArray();
        if($($(this)).children('img').attr('id')==undefined){
            return;
        }
    }else{
        movements(cellID);
        // isSelected=false;//keep it
        // return;//keep it
    }


    if($(this).children('img').attr('id')!=undefined){
        pieceClass = $(this).children('img').attr('class'); //get the select chess piece class
    }

    lastLetterOFGridPos = parseInt(cellID.charAt(cellID.length-1));  //get the last character of the selected piece.. Ex:you select H8 pic and the answer is 8
    firstLetterOFGridPos=coloumn.indexOf(cellID.charAt(0)); //get the first character index of the selected piece Ex.. Ex:you select H8 and first character is 'H' and its index is 7
    // console.log("Cell ID :"+cellID);
    // console.log("Piece ID :"+pieceID);
    // console.log("Piece Class :"+pieceClass);
    // console.log("Last char :"+lastLetterOFGridPos);
    // console.log("Last char :"+firstLetterOFGridPos);

    if(pieceID!=undefined && pieceClass.substring(0,1)=='w'){
        if(isCorrect ){
            // console.log(pieceID); //
            clearArray();
            switch (pieceClass){
                case 'wPawn'  :legalMoveForW_Pawn(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'wRook'  :legalMoveForW_Rook(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'wKing'  :legalMoveForW_King(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'wBishop':legalMoveForW_Bishop(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'wQueen' :legalMoveForW_Queen(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'wKnight':legalMoveForW_Knight(firstLetterOFGridPos,lastLetterOFGridPos);break;
            }
            isCorrect=false;
            prePieceID=pieceID;
        }else{
            isSelected=false;
            alert("IT'S NOT YOUR TURN");

        }
    }
    if(pieceID!=undefined && pieceClass.substring(0,1)=='b'){
        if(!isCorrect){
            clearArray();
            switch (pieceClass){
                // case 'wPawn'  :legalMoveForW_Pawn(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'bPawn'  :legalMoveForB_pawn(firstLetterOFGridPos,lastLetterOFGridPos);break;
                // case 'wRook'  :legalMoveForW_Rook(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'bRook'  :legalMoveForB_Rook(firstLetterOFGridPos,lastLetterOFGridPos);break;
                // case 'wKing'  :legalMoveForW_King(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'bKing'  :legalMoveForB_King(firstLetterOFGridPos,lastLetterOFGridPos);break;
                // case 'wBishop':legalMoveForW_Bishop(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'bBishop':legalMoveForB_Bishop(firstLetterOFGridPos,lastLetterOFGridPos);break;
                // case 'wQueen' :legalMoveForW_Queen(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'bQueen' :legalMoveForB_Queen(firstLetterOFGridPos,lastLetterOFGridPos);break;
                // case 'wKnight':legalMoveForW_Knight(firstLetterOFGridPos,lastLetterOFGridPos);break;
                case 'bKnight':legalMoveForB_Knight(firstLetterOFGridPos,lastLetterOFGridPos);break;
            }
            prePieceID=pieceID;
            isCorrect=true;
        }else{
            isSelected=false;
            alert("IT'S NOT YOUR TURN" );

        }
    }


    if(pieceID!=undefined){
        isSelected=true;
    }else{
        isSelected=false;
    }
});

function movements(cellId){
    var index=previous.indexOf(('#'+cellId));

    if(index>-1){	//If a possible move
        var pieceClass =$('#'+cellId).children('img').attr('class');
        var isAttack=$($("#"+cellId)).hasClass("attackCell");
        var clone=$($("#"+prePieceID)).clone();
        if(pieceClass!=undefined){
            var name=$("#"+prePieceID).attr('class').substring(1);
            var prefix=$("#"+prePieceID).attr('class').substring(0,1);
            var king=pieceClass.substring(1);
            if(king=='King'){
                alert('CHECK');
                clearArray();
                return;
            }
            for (var a in proArray){ // pawn promotion JQuery Dialog box
                if(name=='Pawn' && cellId==proArray[a]){
                    $(function () {
                        $("#dialog").text('- - - - - - - - - - - - - Pawn Promotion - - - - - - - - - - - - -');
                        $("#dialog").dialog({
                            // modal: false,
                            closeText:'X',
                            width: 350,
                            draggable:false,
                            resizable:false,
                            height: 160,
                            content:'This is an info',
                            dialogClass: 'custom-ui-widget-header',
                            open:function(e) {
                                $(e.target).parent().css('background-color','#D7F3F9');
                            },
                            buttons: [
                                {
                                    id: "queen",
                                    text: "Queen",
                                    style:"margin-right:30px;margin-left:30px;margin-bottom:50px;",
                                    click: function () {
                                        proName='Q';
                                        promotion(prefix,proName);
                                        $("#dialog").dialog("close");
                                    },
                                },
                                {
                                    id: "knight",
                                    text: "Knight",
                                    style:"margin-right:30px;margin-bottom:50px;",
                                    click: function () {
                                        proName='N';
                                        promotion(prefix,proName);
                                        $("#dialog").dialog("close");
                                    },
                                },
                                {
                                    id: "bishop",
                                    text: "Bishop",
                                    style:"margin-right:30px;margin-bottom:50px;",
                                    click: function () {
                                        proName='B';
                                        promotion(prefix,proName);
                                        $("#dialog").dialog("close");
                                    },
                                },
                                {
                                    id: "rook",
                                    text: "Rook",
                                    style:"margin-bottom:50px;",
                                    click: function () {
                                        proName='R';
                                        promotion(prefix,proName);
                                        $("#dialog").dialog("close");
                                    },
                                }
                            ]
                        });
                    });

                }
            }


        }

        if(isAttack){
            console.log("attack cell Id : "+cellId);
            $($("#"+prePieceID)).remove();
            $($("#"+cellId)).children('img').remove();
            $($("#"+cellId)).append(clone);
        }else{
            $($("#"+prePieceID)).remove();
            $($("#"+cellId)).append(clone);
        }
        clearArray();
    }else{	//If a regular div which isn't possible

        clearArray();
    }
}

function promotion(prefix,arg) {
    if(arg=='Q' && prefix=='w'){
        $('#'+prePieceID).replaceWith("<img src='images/wQ.png' id='wPro-1' class='wQueen'>");
    }
    if(arg=='Q' && prefix=='b'){
        $('#'+prePieceID).replaceWith("<img src='images/bQ.png' id='bPro-2' class='bQueen'>");
    }
    if(arg=='B' && prefix=='w'){
        $('#'+prePieceID).replaceWith("<img src='images/wB.png' id='wPro-3' class='wBishop'>");
    }
    if(arg=='B' && prefix=='b'){
        $('#'+prePieceID).replaceWith("<img src='images/bB.png' id='bPro-4' class='bBishop'>");
    }
    if(arg=='N' && prefix=='w'){
        $('#'+prePieceID).replaceWith("<img src='images/wN.png' id='wPro-5' class='wKnight'>");
    }
    if(arg=='N' && prefix=='b'){
        $('#'+prePieceID).replaceWith("<img src='images/bN.png' id='bPro-6' class='bKnight'>");
    }
    if(arg=='R' && prefix=='w'){
        $('#'+prePieceID).replaceWith("<img src='images/wR.png' id='wPro-7' class='wRook'>");
    }
    if(arg=='R' && prefix=='b'){
        $('#'+prePieceID).replaceWith("<img src='images/bR.png' id='bPro-8' class='bRook'>");
    }
}

function clearArray() {
    for (var a in previous){
        $(previous[a]).removeClass('attackCell');
        $(previous[a]).removeClass('legal');
    }
    previous.splice(0,previous.length);
}

/////////////////////////////////////////////////////////////-----------------Pawn-------------------//////////////////////////////////////////////////////////////////////////

function legalMoveForW_Pawn(firstLetterOFGridPos,lastLetterOFGridPos){ //white pawn legal path
    var ID1="";
    var ID2="";
    var ID="";

    if(lastLetterOFGridPos==2){
        ID1 = "#"+coloumn[firstLetterOFGridPos]+(lastLetterOFGridPos+1);
        ID2 = "#"+coloumn[firstLetterOFGridPos]+(lastLetterOFGridPos+2);
        if($($(ID1)).children('img').attr('id')==undefined){
            previous.push(ID1);
            if($($(ID2)).children('img').attr('id')==undefined){
                previous.push(ID2);
            }
        }
    }else{
        ID = "#"+coloumn[firstLetterOFGridPos]+(lastLetterOFGridPos+1);
        if($($(ID)).children('img').attr('id')==undefined){
            previous.push(ID);
        }
    }
    attackCellOfPawn('wPawn',firstLetterOFGridPos,lastLetterOFGridPos);
    colourCells();
}


function legalMoveForB_pawn(firstLetterOFGridPos,lastLetterOFGridPos) { //black pawn legal path
    if(lastLetterOFGridPos==7){
        var ID1 ="#"+coloumn[firstLetterOFGridPos]+(lastLetterOFGridPos-1);
        var ID2 ="#"+coloumn[firstLetterOFGridPos]+(lastLetterOFGridPos-2);
        if($(ID1).children('img').attr('id')==undefined){
            previous.push(ID1);
            if($($(ID2)).children('img').attr('id')==undefined){
                previous.push(ID2);
            }
        }
    }else{
        var ID ="#"+coloumn[firstLetterOFGridPos]+(lastLetterOFGridPos-1);
        if($(ID).children('img').attr('id')==undefined){
            previous.push(ID);
        }
    }
    attackCellOfPawn('bPawn',firstLetterOFGridPos,lastLetterOFGridPos);
    colourCells();
}

function attackCellOfPawn(pieceClass,firstLetterOFGridPos,lastLetterOFGridPos) { // attack cell of the each of pawn
    var f_letterColumn=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letterRow=$.inArray(lastLetterOFGridPos,row);
    if(pieceClass=='wPawn'){
        L1:for (var i=f_letterColumn-1;i<f_letterColumn+2;i++){
            for (var j=l_letterRow+1;j<l_letterRow+2;j++){
                if(i==f_letterColumn)continue L1;
                var ID=coloumn[i]+row[j];
                if(($('#'+ID).children('img')).attr('id')!=undefined && ($('#'+ID).children('img')).attr('class').substring(0,1)=='b'){ //check the attack cell has a child and its colour of the piece
                    previous.push(('#'+ID));
                }

            }
        }
    }else{
        L1:for (var i=f_letterColumn-1;i<f_letterColumn+2;i++){
            for (var j=l_letterRow-1;j<l_letterRow;j++){
                if(i==f_letterColumn)continue L1;
                var ID=coloumn[i]+row[j];
                if(($('#'+ID).children('img')).attr('id')!=undefined && ($('#'+ID).children('img')).attr('class').substring(0,1)=='w'){ //check the attack cell has a child and its colour of the piece
                    previous.push(('#'+ID));
                }
            }
        }
    }
}


///////////////////////////////////////////////////////////////////---------------Rook-------------------//////////////////////////////////////////////////////////////////////

function legalMoveForW_Rook(firstLetterOFGridPos,lastLetterOFGridPos) { //White Rook legal Path
    var f_letter=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letter=$.inArray(lastLetterOFGridPos,row);

    L1:for (var i=l_letter+1;i<8;i++){ //This loop for North way
        var ID1='#'+coloumn[f_letter]+row[i];
        if ($(ID1).children('img').length==1){
            if($(ID1).children('img').attr('class').substring(0,1)=='w'){
                break L1;
            }

            if($(ID1).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID1);
                break L1;
            }
        }else {
            previous.push(ID1);
        }
    }

    L2:for (var i=l_letter-1;i>=0;i--){ //This loop for South way
        var ID2='#'+coloumn[f_letter]+row[i];
        if ($(ID2).children('img').length==1){
            if($(ID2).children('img').attr('class').substring(0,1)=='w'){
                break L2;
            }

            if($(ID2).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID2);
                break L2;
            }
        }else {;
            previous.push(ID2);
        }

    }

    L3:for (var i=f_letter+1;i<8;i++){ //This loop for East way
        var ID3='#'+coloumn[i]+row[l_letter];
        if ($(ID3).children('img').length==1){
            if($(ID3).children('img').attr('class').substring(0,1)=='w'){
                break L3;
            }

            if($(ID3).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID3);
                break L3;
            }
        }else {
            previous.push(ID3);
        }
    }

    L4:for (var i=f_letter-1;i>=0;i--){ //This loop for West way
        var ID4='#'+coloumn[i]+row[l_letter];
        if ($(ID4).children('img').length==1){
            if($(ID4).children('img').attr('class').substring(0,1)=='w'){
                break L4;
            }

            if($(ID4).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID4);
                break L4;
            }
        }else {
            previous.push(ID4);
        }
    }
    colourCells();
}

function colourCells() {
    var a=0;
    for(a in previous){
        var check=$(previous[a]).children('img').attr('class');
        if(check==undefined){
            $(previous[a]).addClass('legal');
        }else {
            $(previous[a]).addClass('attackCell');
        }
    }
}

function legalMoveForB_Rook(firstLetterOFGridPos,lastLetterOFGridPos) { //Black Rook legal path
    var f_letter=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letter=$.inArray(lastLetterOFGridPos,row);

    L1:for (var i=l_letter+1;i<8;i++){ //This loop for North way
        var ID1='#'+coloumn[f_letter]+row[i];

        if ($(ID1).children('img').length==1){
            if($(ID1).children('img').attr('class').substring(0,1)=='b'){
                break L1;
            }

            if($(ID1).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID1);
                break L1;
            }
        }else {
            previous.push(ID1);
        }
    }

    L2:for (var i=l_letter-1;i>=0;i--){ //This loop for South way
        var ID2='#'+coloumn[f_letter]+row[i];

        if ($(ID2).children('img').length==1){
            if($(ID2).children('img').attr('class').substring(0,1)=='b'){
                break L2;
            }

            if($(ID2).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID2);
                break L2;
            }
        }else {
            previous.push(ID2);
        }
    }

    L3:for (var i=f_letter+1;i<8;i++){ //This loop for East way
        var ID3='#'+coloumn[i]+row[l_letter];

        if ($(ID3).children('img').length==1){
            if($(ID3).children('img').attr('class').substring(0,1)=='b'){
                break L3;
            }

            if($(ID3).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID3);
                break L3;
            }
        }else {
            previous.push(ID3);
        }
    }

    L4:for (var i=f_letter-1;i>=0;i--){ //This loop for west way
        var ID4='#'+coloumn[i]+row[l_letter];
        if ($(ID4).children('img').length==1){
            if($(ID4).children('img').attr('class').substring(0,1)=='b'){
                break L4;
            }

            if($(ID4).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID4);
                break L4;
            }
        }else {
            previous.push(ID4);
        }
    }
    colourCells();;
}

////////////////////////////////////////////////////////////////----------------King-----------------------//////////////////////////////////////////////////////////////////////

function legalMoveForW_King(firstLetterOFGridPos,lastLetterOFGridPos) {
    var f_letterColumn=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letterRow=$.inArray(lastLetterOFGridPos,row);
    for (var i = f_letterColumn-1; i < f_letterColumn+2; i++) {
        for (var j = l_letterRow-1; j < l_letterRow+2; j++) {
            var ID = '#'+coloumn[i]+row[j];
            if($(ID).children('img').length==1) {
                if ($(ID).children('img').attr('class').substring(0, 1) == 'w') {
                }
                if ($(ID).children('img').attr('class').substring(0, 1) == 'b') {
                    previous.push(ID);
                }
            }else{
                previous.push(ID);
            }
        }
    }
    colourCells();
}

function legalMoveForB_King(firstLetterOFGridPos,lastLetterOFGridPos) {
    var f_letterColumn=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letterRow=$.inArray(lastLetterOFGridPos,row);
    for (var i = f_letterColumn-1; i < f_letterColumn+2; i++) {
        for (var j = l_letterRow-1; j < l_letterRow+2; j++) {
            var ID = '#'+coloumn[i]+row[j];
            if($(ID).children('img').length==1) {
                if ($(ID).children('img').attr('class').substring(0, 1) == 'b') {
                }
                if ($(ID).children('img').attr('class').substring(0, 1) == 'w') {
                    previous.push(ID);
                }
            }else{;
                previous.push(ID);
            }
        }
    }
    colourCells();
}

//////////////////////////////////////////////////////////////////----------------------Bishop--------------------------/////////////////////////////////////////////////////////

function legalMoveForW_Bishop(firstLetterOFGridPos,lastLetterOFGridPos) {
    var l_letter=lastLetterOFGridPos;
    L1:for(var i=firstLetterOFGridPos+1;i<8;i++) { //This loop for NorthWest way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L1;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L1;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    L2:for (var i=firstLetterOFGridPos-1;i>=0;i--){ //This loop for NorthEast way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L2;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L2;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L3:for(var i=firstLetterOFGridPos+1;i<8;i++){ // This loop for SouthEast way
        var ID='#'+coloumn[i]+row[--l_letter];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L3;
            }
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L3;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L4:for (var i=firstLetterOFGridPos-1;i>=0;i--){ // This loop for SouthWest way
        var ID='#'+coloumn[i]+row[--l_letter];
        if ($(ID).children('img').length==1){
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L4;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L4;
            }
        }else{
            previous.push(ID);
        }
    }
    colourCells();
}

function legalMoveForB_Bishop(firstLetterOFGridPos,lastLetterOFGridPos) {
    var l_letter=lastLetterOFGridPos;
    L1:for(var i=firstLetterOFGridPos+1;i<8;i++) { //This loop for NorthWest way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L1;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L1;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    L2:for (var i=firstLetterOFGridPos-1;i>=0;i--){ //This loop for NorthEast way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L2;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L2;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L3:for(var i=firstLetterOFGridPos+1;i<8;i++){ // This loop for SouthEast way
        var ID='#'+coloumn[i]+row[--l_letter];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L3;
            }
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L3;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L4:for (var i=firstLetterOFGridPos-1;i>=0;i--){ // This loop for SouthWest way
        var ID='#'+coloumn[i]+row[--l_letter];
        if ($(ID).children('img').length==1){
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L4;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L4;
            }
        }else{
            previous.push(ID);
        }
    }
    colourCells();
}

/////////////////////////////////////////////////////////////////////----------------Queen-----------------/////////////////////////////////////////////////////////////////////

function legalMoveForW_Queen(firstLetterOFGridPos,lastLetterOFGridPos) { // White Queen legal path
    var f_letter=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letter=$.inArray(lastLetterOFGridPos,row);

    D1:for (var i=l_letter+1;i<8;i++){ //This loop for North way
        var ID1='#'+coloumn[f_letter]+row[i];
        if ($(ID1).children('img').length==1){
            if($(ID1).children('img').attr('class').substring(0,1)=='w'){
                break D1;
            }
            if($(ID1).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID1);
                break D1;
            }
        }else {
            previous.push(ID1);
        }
    }

    D2:for (var i=l_letter-1;i>=0;i--){ //This loop for South way
        var ID2='#'+coloumn[f_letter]+row[i];

        if ($(ID2).children('img').length==1){
            if($(ID2).children('img').attr('class').substring(0,1)=='w'){
                break D2;
            }

            if($(ID2).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID2);
                break D2;
            }
        }else {
            previous.push(ID2);
        }
    }

    D3:for (var i=f_letter+1;i<8;i++){ //This loop for East way
        var ID3='#'+coloumn[i]+row[l_letter];

        if ($(ID3).children('img').length==1){
            if($(ID3).children('img').attr('class').substring(0,1)=='w'){
                break D3;
            }

            if($(ID3).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID3);
                break D3;
            }
        }else{
            previous.push(ID3);
        }
    }

    D4:for (var i=f_letter-1;i>=0;i--){ //This loop for West way
        var ID4='#'+coloumn[i]+row[l_letter];

        if ($(ID4).children('img').length==1){
            if($(ID4).children('img').attr('class').substring(0,1)=='w'){
                break D4;
            }

            if($(ID4).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID4);
                break D4;
            }
        }else {
            previous.push(ID4);
        }
    }

    var l_letter=lastLetterOFGridPos;
    L1:for(var i=firstLetterOFGridPos+1;i<8;i++) { //This loop for NorthWest way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L1;
            }

            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L1;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    L2:for (var i=firstLetterOFGridPos-1;i>=0;i--){ //This loop for NorthEast way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L2;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L2;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L3:for(var i=firstLetterOFGridPos+1;i<8;i++){ // This loop for SouthEast way
        var ID='#'+coloumn[i]+row[--l_letter];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L3;
            }
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L3;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L4:for (var i=firstLetterOFGridPos-1;i>=0;i--){ // This loop for SouthWest way
        var ID='#'+coloumn[i]+row[--l_letter];
        if ($(ID).children('img').length==1){
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                break L4;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                previous.push(ID);
                break L4;
            }
        }else{
            previous.push(ID);
        }
    }
    colourCells();
}

function legalMoveForB_Queen(firstLetterOFGridPos,lastLetterOFGridPos) {
    var f_letter=$.inArray(coloumn[firstLetterOFGridPos],coloumn);
    var l_letter=$.inArray(lastLetterOFGridPos,row);

    D1:for (var i=l_letter+1;i<8;i++){ //This loop for North way
        var ID1='#'+coloumn[f_letter]+row[i];
        if ($(ID1).children('img').length==1){
            if($(ID1).children('img').attr('class').substring(0,1)=='b'){
                break D1;
            }

            if($(ID1).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID1);
                break D1;
            }
        }else {
            previous.push(ID1);
        }
    }

    D2:for (var i=l_letter-1;i>=0;i--){ //This loop for South way
        var ID2='#'+coloumn[f_letter]+row[i];
        if ($(ID2).children('img').length==1){
            if($(ID2).children('img').attr('class').substring(0,1)=='b'){
                break D2;
            }

            if($(ID2).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID2);
                break D2;
            }
        }else {
            previous.push(ID2);
        }
    }

    D3:for (var i=f_letter+1;i<8;i++){ //This loop for East way
        var ID3='#'+coloumn[i]+row[l_letter];
        if ($(ID3).children('img').length==1){
            if($(ID3).children('img').attr('class').substring(0,1)=='b'){
                break D3;
            }

            if($(ID3).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID3);
                break D3;
            }
        }else {
            previous.push(ID3);
        }
    }

    D4:for (var i=f_letter-1;i>=0;i--){ //This loop for west way
        var ID4='#'+coloumn[i]+row[l_letter];
        if ($(ID4).children('img').length==1){
            if($(ID4).children('img').attr('class').substring(0,1)=='b'){
                break D4;
            }

            if($(ID4).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID4);
                break D4;
            }
        }else {
            previous.push(ID4);
        }
    }

    var l_letter=lastLetterOFGridPos;
    L1:for(var i=firstLetterOFGridPos+1;i<8;i++) { //This loop for NorthWest way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L1;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L1;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    L2:for (var i=firstLetterOFGridPos-1;i>=0;i--){ //This loop for NorthEast way
        var ID='#'+coloumn[i]+row[l_letter++];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L2;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L2;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L3:for(var i=firstLetterOFGridPos+1;i<8;i++){ // This loop for SouthEast way
        var ID='#'+coloumn[i]+row[--l_letter];
        if($(ID).children('img').length==1){
            if ($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L3;
            }
            if ($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L3;
            }
        }else{
            previous.push(ID);
        }
    }

    l_letter=lastLetterOFGridPos;
    l_letter--;
    L4:for (var i=firstLetterOFGridPos-1;i>=0;i--){ // This loop for SouthWest way
        var ID='#'+coloumn[i]+row[--l_letter];
        if ($(ID).children('img').length==1){
            if($(ID).children('img').attr('class').substring(0,1)=='b'){
                break L4;
            }
            if($(ID).children('img').attr('class').substring(0,1)=='w'){
                previous.push(ID);
                break L4;
            }
        }else{
            previous.push(ID);
        }
    }
    colourCells();
}

///////////////////////////////////////////////////////////////////////-------------------Knight-----------------////////////////////////////////////////////////////////////////

function legalMoveForW_Knight(firstLetterOFGridPos,lastLetterOFGridPos) {
    var f_letter=firstLetterOFGridPos;
    var l_letter=$.inArray(lastLetterOFGridPos,row);

    for (var i=l_letter-2;i<l_letter;i++){
        var ID='#'+coloumn[--f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='w'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='b'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }

    f_letter=firstLetterOFGridPos;
    for(var i=l_letter+2;i>l_letter;i--){
        var ID='#'+coloumn[--f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='w'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='b'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }

    f_letter=firstLetterOFGridPos;
    for (var i=l_letter-2;i<l_letter;i++){
        var ID='#'+coloumn[++f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='w'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='b'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }

    f_letter=firstLetterOFGridPos;
    for(var i=l_letter+2;i>l_letter;i--){
        var ID='#'+coloumn[++f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='w'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='b'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }
    colourCells();
}

function legalMoveForB_Knight(firstLetterOFGridPos,lastLetterOFGridPos) {
    var f_letter=firstLetterOFGridPos;
    var l_letter=$.inArray(lastLetterOFGridPos,row);

    for (var i=l_letter-2;i<l_letter;i++){
        var ID='#'+coloumn[--f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='b'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='w'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }

    f_letter=firstLetterOFGridPos;
    for(var i=l_letter+2;i>l_letter;i--){
        var ID='#'+coloumn[--f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='b'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='w'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }

    f_letter=firstLetterOFGridPos;
    for (var i=l_letter-2;i<l_letter;i++){
        var ID='#'+coloumn[++f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='b'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='w'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }

    f_letter=firstLetterOFGridPos;
    for(var i=l_letter+2;i>l_letter;i--){
        var ID='#'+coloumn[++f_letter]+row[i];
        var letter=$(ID).children('img').attr('class');
        if((letter!=undefined)&&letter.substr(0,1)=='b'){
            continue;
        }else if((letter!=undefined)&&letter.substr(0,1)=='w'){
            previous.push(ID);
            continue;
        }
        if(ID!=undefined){
            previous.push(ID);
        }
    }
    colourCells();
}