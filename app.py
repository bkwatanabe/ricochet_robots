# from flask import Flask, render_template, jsonify
from chalice import Chalice, Response
import jinja2
# from flask_socketio import SocketIO, emit
import ast
import random
import os

# app = Flask(__name__)
# socketio = SocketIO(app)
app = Chalice(app_name='ricochet_robots')
# app.log.debug = True

@app.route("/")
def home():
    # return render_template("index.html")
    template = render("chalicelib/templates/index.html")
    return Response(template, status_code=200, headers={"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"})

def render(tpl_path):
    path, filename = os.path.split(tpl_path)
    return jinja2.Environment(loader=jinja2.FileSystemLoader(path or "./")).get_template(filename).render()

@app.route("/static/styles/{file_path}")
def get_styles(file_path):
    with open(f"chalicelib/static/styles/{file_path}") as file:
        return Response(file.read(), status_code=200, headers={"Content-Type": "text/css", "Access-Control-Allow-Origin": "*"})

@app.route("/static/js/{file_path}")
def get_js(file_path):
    with open(f"chalicelib/static/js/{file_path}") as file:
        return Response(file.read(), status_code=200, headers={"Content-Type": "application/javascript", "Access-Control-Allow-Origin": "*"})
    
@app.route("/static/lib/{file_path}")
def get_lib(file_path):
    with open(f"chalicelib/static/lib/{file_path}") as file:
        return Response(file.read(), status_code=200, headers={"Content-Type": "application/javascript", "Access-Control-Allow-Origin": "*"})

@app.route("/board")
def get_full_board():
    [boardname_0, boardname_1, boardname_2, boardname_3] = get_board_names()
    with open(f"chalicelib/static/boards/board{boardname_0}.json") as f_0, \
         open(f"chalicelib/static/boards/board{boardname_1}.json") as f_1, \
         open(f"chalicelib/static/boards/board{boardname_2}.json") as f_2, \
         open(f"chalicelib/static/boards/board{boardname_3}.json") as f_3:
        board_0 = ast.literal_eval(f_0.read())
        board_1 = ast.literal_eval(f_1.read())
        board_2 = ast.literal_eval(f_2.read())
        board_3 = ast.literal_eval(f_3.read())
        new_board = Board(board_0, board_1, board_2, board_3)
        output = {"board": new_board.board, "robots": new_board.robots}
        # return jsonify(output)
        return Response(output, status_code=200, headers={"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"})

@app.route("/favicon.ico")
def get_favicon():
    with open(f"chalicelib/static/img/red-robot.ico", "rb") as file:
        return Response(file.read(), status_code=200, headers={"Content-Type": "img/svg+xml", "Access-Control-Allow-Origin": "*"})

def get_board_names() :
    output = []
    for board in random.sample(range(1,5), 4):
        output.append(str(board) + random.choice(["a", "b"]))
    return output

class Board:
    def __init__(self, board1, board2, board3, board4) -> None:
        self.board = self._assemble_board(board1, board2, board3, board4)
        self.robots = self._init_robots()
            
    def _assemble_board(self, board_0, board_1, board_2, board_3):
        # rotate boards
        r_board_1 = self._rotate_board(board_1)
        r_board_2 = self._rotate_board(self._rotate_board(board_2))
        r_board_3 = self._rotate_board(self._rotate_board(self._rotate_board(board_3)))
        # stick boards together
        # combine rows on boards 1 and 2
        top_board = self._combine_horizontal(r_board_1, r_board_2)
        # combine rows on boards 0 and 3
        bottom_board = self._combine_horizontal(board_0, r_board_3)
        # stack 1+2 on top of 0+3
        full_board = top_board + bottom_board
        return full_board
    
    def _rotate_board(self, board):
        # change cell coords
        new_board = []
        for col in range(len(board[0])):
            new_row = [self._rotate_cell(board[row][col]) for row in range(len(board))[::-1]]
            new_board.append(new_row)
        return new_board

    def _rotate_cell(self, cell):
        new_cell = [cell[3], cell[2], cell[0], cell[1], cell[4]]
        return new_cell

    def _combine_horizontal(self, left_board, right_board):
        output = []
        for i in range(len(left_board)):
            output.append(left_board[i] + right_board[i])
        return output

    def _init_robots(self):
        rows = range(16)
        cols = range(16)
        cells = []
        for i in rows:
            for j in cols:
                # exclude center cells
                if (i, j) not in [(7, 7), (7, 8), (8, 7), (8, 8)]:
                    cells.append([i, j])
        locations = random.sample(cells, k=5)
        return {
            "red": locations[0],
            "blue": locations[1],
            "green": locations[2],
            "gold": locations[3],
            "black": locations[4]
        }