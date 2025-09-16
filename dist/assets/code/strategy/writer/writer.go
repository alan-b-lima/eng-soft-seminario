package main

import (
	"fmt"
	"io"
	"net"
	"os"

	"github.com/alan-b-lima/eng-soft-seminario/dist/assets/code/strategy/pen"
)

func main() {
	var writer io.Writer

	writer, _ = net.Dial("tcp", "8.8.8.8:443")
	fmt.Fprintln(writer, "Hello, World!")

	writer, _ = os.Create("./a.txt")
	fmt.Fprintln(writer, "Hello, World!")
	
	writer = &pen.Pen{os.Stdout, pen.Color{R: 255}}
	fmt.Fprintln(writer, "Hello, World!")
}
