require 'bundler'
require 'json'
require 'colorize'
require 'dotenv/load' if ENV['APP_ENV'] === "development"

Bundler.require
require './app'

run App