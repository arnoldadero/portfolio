package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			c.JSON(-1, gin.H{"error": c.Errors[0].Error()})
		} else if status := c.Writer.Status(); status >= 400 {
			c.JSON(status, gin.H{"error": http.StatusText(status)})
		}
	}
}
