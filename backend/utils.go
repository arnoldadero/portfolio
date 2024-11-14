package main

import (
	"github.com/gosimple/slug"
)

// generateTitleSlug converts a given title to a URL-friendly slug.
// It converts the title to lowercase and replaces spaces with hyphens.
func generateTitleSlug(title string) string {
	return slug.Make(title)
}
