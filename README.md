## PREREQUISITE

You need to install these dependencies in your environment

- `ruby 2.5.1`
- `bundler` (`gem install bundler`)
- `parcelcli` (`npm i -g parcel-bundler`)

## HOW TO RUN

- run `bundle install`
- run `bundle exec foreman start -f Procfile.dev`
- server will be run at port `3000` and parcel at port `3100` (you can change it in `Procfile.dev`)
