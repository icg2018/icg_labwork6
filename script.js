function get_coords(t) {
    return [$(t).attr('data-x'), $(t).attr('data-y')]
}

wins = 0
losses = 0
s=''
function block_click(t) {
    [x, y] = get_coords(t)
    select_symb(x, y)
}

function select_symb(x, y) {
    console.log(game.win)
    if (game.win) {
        return
    }
    if (game.pole[y][x]) {
        show_message('taken already')
        return
    }

    set_symbol(x, y, table[y][x])
    draw_symb()

    if (table[y][x]=='bomb') {
        show_message('gg my son train more please')
        game.win = true
        console.log(game.win)
	losses++
	
	for(x=0;x<3;x++)for(y=0;y<3;y++)
		set_symbol(x, y, table[y][x])
    draw_symb()	
	start=1
        return
    }
tmp=0
	for(x=0;x<3;x++)for(y=0;y<3;y++)
		if(game.pole[x][y]==table[x][y] && game.pole[x][y]!='bomb' && game.pole[x][y]!='')tmp++

    if(tmp==9-bomb) {
	wins++
start=1

	for(x=0;x<3;x++)for(y=0;y<3;y++)
	set_symbol(x, y, table[y][x])
        draw_symb()
        show_message('gg')
        game.win = true
        return
    }

}

function block_hover(t) {
    [x, y] = get_coords(t)
    if (game.pole[y][x]) return
    n = (x - 0) + (y * game.size_x - 0)
    color = '#00f'
    document.getElementById('BoxChaser_' + x + '_' + y).setAttribute('set_destination', color)
}

function block_out(t) {
    [x, y] = get_coords(t)
    n = (x - 0) + (y * game.size_x - 0)
    color = n % 2 ? '1 0 0' : '0 1 0'
    document.getElementById('BoxChaser_' + x + '_' + y).setAttribute('set_destination', color)
}

function show_message(text) {
    console.log(text)
    $('#status').attr('string', text)
    $('#status2').attr('string', s)
}

function set_symbol(x, y, v) {
    game.pole[y][x] = v
}

function draw_symb() {
    if (!game) return
    $('.block').each(function () {
        [x, y] = get_coords(this)
        var text = 'nope'
	if(game.pole[y][x]!='')text=game.pole[y][x]
        $('[DEF="point_' + x + '_' + y + '"]').find('Appearance ImageTexture').attr('url', text + '.png')
    })
}

function restart() {
flag = 0
bomb =0
table = [[], [], []]

    game = jQuery.extend(true, {}, def_game);
    game.pole = [['', '', ''], ['', '', ''], ['', '', ''] ]


	var bb = (Math.round(Math.random()*100)%8)+1



	for(i=0; i<bb;i++)
		{
		
		q=Math.floor((Math.round(Math.random()*100)%8+1)/3)
		w=((Math.round(Math.random()*100)%8)+1)%3
		if(table[q][w])
			{--i; continue}
			else table[q][w]='bomb'
		}
	
	for(i=0; i<9;i++)
		{
		if(table[Math.floor(i/3)][i%3]=='bomb')
			{++bomb;continue}
			else 
{
q = Math.floor(i/3)
w = i%3
cnt=0
for(e=0; e<9;e++)
	{
	if(q-Math.floor(e/3)+1<0 || q-Math.floor(e/3)+1>2 ||  w-e%3+1<0 || w-e%3+1>2)
		continue
		else if(table[q-Math.floor(e/3)+1][w-e%3+1]=='bomb')cnt++
	}
table[q][w]=cnt.toString()
}

		}


    draw_symb()
s = "побед - " +wins+"\nпоражений - "+losses

    show_message("gl")

}

function key_press(e) {
    switch (e.key) {
        case "1":
            select_symb(0, 0);
            break;
        case "2":
            select_symb(1, 0);
            break;
        case "3":
            select_symb(2, 0);
            break;
        case "4":
            select_symb(0, 1);
            break;
        case "5":
            select_symb(1, 1);
            break;
        case "6":
            select_symb(2, 1);
            break;
        case "7":
            select_symb(0, 2);
            break;
        case "8":
            select_symb(1, 2);
            break;
        case "9":
            select_symb(2, 2);
            break;
    }
}


$(function () {

	
    restart()
})