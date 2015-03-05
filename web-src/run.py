# Convert important blocking functions into non-blocking
from gevent import monkey

monkey.patch_all()

from app import socket
from app import create_app

app = create_app(True)

if __name__ == '__main__':
    socket.run(app, host='0.0.0.0')