package pen

import (
	"fmt"
	"io"
	"os"
)

type Color struct{ R, G, B uint8 }

type Pen struct {
	io.Writer
	Color Color
}

func (p *Pen) Write(buf []byte) (int, error) {
	defer fmt.Fprint(p.Writer, "\033[m")
	fmt.Fprintf(p.Writer, "\033[38;2;%d;%d;%dm",
		p.Color.R, p.Color.G, p.Color.B,
	)

	return p.Writer.Write(buf)
}

func main() {
	pen := &Pen{Writer: os.Stdout}

	pen.Color = Color{R: 255}
	fmt.Fprintln(pen, "Hello, World in Red!")

	pen.Color = Color{B: 255}
	fmt.Fprintln(pen, "Hello, World in Blue!")

	pen.Color = Color{R: 255, G: 255}
	fmt.Fprintln(pen, "Hello, World in Yellow!")
}
