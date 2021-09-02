
require_relative 'github.rb'

include Github

class App < Sinatra::Base
  get '/' do
    File.read(File.join('public', "index.html"))
  end

  post '/hooks/github' do 
    content_type :json
    batch_name = request.body["github_username"] || 'rmt-15-oslo-fox'
    repos = Github::get_all_repos_with_commits(batch_name)
    repos.to_hash.to_json
  end

end