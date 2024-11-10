package middleware

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()

        // Only handle errors after request processing
        if len(c.Errors) > 0 {
            for _, e := range c.Errors {
                log.Printf("Error: %v", e.Err)
            }

            // Return last error to client
            err := c.Errors.Last()
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": err.Error(),
            })
        }
    }
}