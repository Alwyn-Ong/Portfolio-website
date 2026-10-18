# resumeData.json format (v2)

All site content lives in `public/resumeData.json`. The site fetches it at runtime, so editing it needs no code change, only a redeploy. The full schema is `schema/resumeData.schema.json`. VS Code autocompletes and validates the file through its `$schema` line. `npm run check-data` (also run before every build) fails on unknown keys, wrong types and duplicate slugs.

Optional fields can be left out. When a field is missing, that part of the page isn't shown, so there are no empty boxes.

## Top level

| Key | Required | Notes |
|---|---|---|
| `version` | yes | `2` |
| `sections` | no | Home page sections and nav, in order. Any of `about`, `work`, `projects`, `skills`, `education`. Omit one to hide it. |
| `main` | yes | Identity, see below |
| `resume` | no | `work`, `education`, `skills`, `projects` arrays |

## `main`
`name` (required), `description` (tagline), `image` (file in `public/images/`), `bio`, `resumedownload` (URL, empty hides it), `social[]` of `{ name, url }`. `name` picks the icon: `linkedin`, `github`, `email`, `website`.

## `resume.work[]`
`company`, `title` (required), `years`, `logo` (file in `public/images/`), `description[]` (bullets).

## `resume.education[]`
`school` (required), `degree`, `graduated`, `description[]`.

## `resume.skills[]`
`name` (required), `level` like `"80%"`.

## `resume.projects[]`
Each project gets a card on the home page and its own page at `/projects/<slug>`. Pages are linked prev/next in array order.

| Key | Required | Shown as |
|---|---|---|
| `title` | yes | Page title |
| `slug` | yes | URL, lowercase-with-dashes, unique |
| `description` | | Summary on card + "What it does" |
| `problem` | | "The problem:" |
| `builtFor` | | "Built for" line |
| `metric` | | Result badge. Only a real, measured number. |
| `technology[]` | | Tech chips |
| `howItWorks[]` | | "How it works" |
| `learned[]` | | "What I learned" |
| `github`, `link` | | Buttons. If both are empty, the project counts as private. |
| `private` | | Override for the private check above |
| `scene` | | `laptop` or `crate`. Default: `crate` if private, else `laptop`. |

## Adding a project
```json
{
  "title": "My New Thing",
  "slug": "my-new-thing",
  "description": "One line.",
  "technology": ["React"]
}
```
Add it to `resume.projects`, run `npm run check-data`, then deploy.
