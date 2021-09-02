require_relative 'lib/github.rb'
include Github

class App < Sinatra::Base
  before do 
    @redis = Redis.new
    @req_body = JSON.parse request.body.read rescue {}
  end

  after do 
    response.headers['Access-Control-Allow-Origin'] = '*'

  end

  get '/' do
    File.read(File.join('public', "index.alpine.html"))
  end

  post '/hooks/github' do 
    content_type :json
    org_name = @req_body["github_username"] || ENV["DEFAULT_GITHUB_ORG"]
    resp_cache = @redis.get(org_name)
    if resp_cache && @req_body["cache"]
      repos = JSON.parse resp_cache
    else 
      repos = Github::get_all_repos_with_commits(org_name, {filter: "p2"}) 
      @redis.set(org_name, repos.to_hash.to_json)
      repos.to_hash.to_json
    end
    repos.to_json
  end

end