from app import create_app
from app import socket
app = create_app(True)

if __name__ == '__main__':
    socket.run(app)

