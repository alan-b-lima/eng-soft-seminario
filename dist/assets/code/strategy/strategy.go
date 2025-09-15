package ansi

import (
	"fmt"
	"io"
)

type PenWriter struct {
	io.Writer
	Pen Pen
}

func (pw PenWriter) Write(b []byte) (int, error) {
	defer pw.Writer.Write(pw.Pen.EndStroke())
	pw.Writer.Write(pw.Pen.StartStroke())

	return pw.Writer.Write(b)
}

type Pen interface {
	StartStroke() []byte
	EndStroke() []byte
}

type ColoredPen struct{ R, G, B uint8 }

func (c ColoredPen) StartStroke() []byte {
	return fmt.Appendf(nil, "\033[38;2;%d;%d;%d",
		c.R, c.G, c.B,
	)
}

func (ColoredPen) EndStroke() []byte {
	return []byte("\033[m")
}
