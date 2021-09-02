require 'sinatra'
require 'octokit'
require 'json'
require "redis"
require 'dotenv/load'

require './app'

run App