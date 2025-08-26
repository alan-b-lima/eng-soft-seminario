package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
)

func main() {
	var err error

	if len(os.Args) < 2 {
		err = Main(":8080")
	} else {
		err = Main(os.Args[1])
	}

	if err != nil {
		fmt.Println(err)
	}
}

type statusRecorder struct {
	http.ResponseWriter
	Status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.Status = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *statusRecorder) Flush() {
	r.ResponseWriter.(http.Flusher).Flush()
}

func Main(addr string) error {
	mux := http.NewServeMux()

	mux.Handle("GET /", http.FileServer(http.Dir("./dist")))

	server := &http.Server{
		Addr:    addr,
		Handler: LoggingMiddleware(mux),
	}

	done := EnableGracefulShutdown(server)

	lstn, err := net.Listen("tcp", server.Addr)
	if err != nil {
		return err
	}

	fmt.Printf("Server listening at \033[1;38;2;110;144;216mhttp://%s\033[m\n", lstn.Addr())
	if err := server.Serve(lstn); err != http.ErrServerClosed {
		return err
	}

	<-done
	return nil
}

func LoggingMiddleware(handler http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rec := &statusRecorder{ResponseWriter: w, Status: 200}

		// log.Printf("\033[38;2;0;0;0;48;2;255;255;255m ACK \033[m %s %s %s", getClientIP(r), r.Method, r.URL)

		handler.ServeHTTP(rec, r)

		switch {
		case 500 <= rec.Status:
			log.Printf("\033[38;2;255;255;255;48;2;165;46;0;1m %03d \033[m %s %s %s", rec.Status, getClientIP(r), r.Method, r.URL)

		case 400 <= rec.Status:
			log.Printf("\033[38;2;255;255;255;48;2;255;0;0;1m %03d \033[m %s %s %s", rec.Status, getClientIP(r), r.Method, r.URL)

		case 300 <= rec.Status:
			log.Printf("\033[38;2;255;255;255;48;2;0;0;127m %03d \033[m %s %s %s", rec.Status, getClientIP(r), r.Method, r.URL)

		case 200 <= rec.Status:
			log.Printf("\033[38;2;255;255;255;48;2;0;176;0m %03d \033[m %s %s %s", rec.Status, getClientIP(r), r.Method, r.URL)

		case 100 <= rec.Status:
			log.Printf("\033[38;2;0;0;0;48;2;255;255;255m %03d \033[m %s %s %s", rec.Status, getClientIP(r), r.Method, r.URL)

		default:
			log.Printf("\033[38;2;0;0;0;48;2;223;245;12m %03d \033[m %s %s %s", rec.Status, getClientIP(r), r.Method, r.URL)
		}
	}
}

func EnableGracefulShutdown(server *http.Server) <-chan struct{} {
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

	done := make(chan struct{})

	go func() {
		<-signals

		shutdownDone := make(chan struct{})

		go func() {
			fmt.Println("Shutting the server down...")
			if err := server.Shutdown(context.Background()); err != nil {
				server.Close()
			}

			shutdownDone <- struct{}{}
		}()

		select {
		case <-shutdownDone:
			done <- struct{}{}

		case <-signals:
			fmt.Println("Killing application...")
			os.Exit(1)
		}
	}()

	return done
}

func getClientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		ips := strings.Split(xff, ",")
		return strings.TrimSpace(ips[0])
	}

	ipPort := r.RemoteAddr
	splits := strings.Split(ipPort, ":")
	if len(splits) < 1 {
		return ipPort
	}

	return strings.Join(splits[:len(splits)-1], ":")
}
