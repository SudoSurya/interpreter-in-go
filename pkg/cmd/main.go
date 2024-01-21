package main

import (
	"fmt"
	"os"
	"os/user"

	"github.com/SudoSurya/interpreter-in-go/repl"
)

func main() {
    user,err := user.Current()
    if  err != nil {
        panic(err)
    }

    fmt.Println("Hello " + user.Username + "! This is the Monkey programming language!")
    fmt.Println("Feel free to type in commands")
    repl.Start(os.Stdin, os.Stdout)
}
