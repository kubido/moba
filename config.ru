require 'bundler'
Bundler.require(:default, ENV['APP_ENV'])

require './app'

run App