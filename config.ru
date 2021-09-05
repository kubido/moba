require 'bundler'
puts ENV['APP_ENV']
Bundler.require(:default, ENV['APP_ENV'])

require './app'

run App