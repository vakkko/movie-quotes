---
paths:
  - 'resources/js/pages/Movies/**'
---

# Movies

## AddMovie modal is the edit form too
AddMovie doubles as the edit modal: pass a `movie` prop (MovieShowResponse) and it prefills from formFromMovie(), submits PUT to movies.update, hides the trigger, and makes the image optional. MovieShowResource exposes title_en/title_ka/director_en/director_ka/description_en/description_ka + release_date (Y-m-d) for the prefill. Movie page opens it via EditDeleteActions with showModal='edit'.
