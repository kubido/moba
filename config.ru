require 'sinatra'
require 'octokit'
require 'json'
require "redis"
require 'dotenv/load'
require 'colorize'


require './app'

run App