module Github

  def client 
    client = Octokit::Client.new(:access_token => ENV['GITHUB_ACCESS_TOKEN'])
  end

  def get_repos(github_user='rmt-15-oslo-fox')
    user = client.user github_user
    github_repos = user.rels[:repos].get.data
    repos = {}
    github_repos.select do |repo| 
      repos[repo.full_name] = []
    end
    repos
  end
  
 
  def repo_commits(repo_name, branch_name=nil)
    commits = []
    user_commits = client.commits(repo_name, branch_name)
    user_commits.each do |commit |
      commits << {author: commit.commit.author.name, message: commit.commit.message}
    end
    commits
  end
  
  def get_all_repos_with_commits(github_user)
    repos = get_repos(github_user)
    repos.keys.each do |repo_name|
      branches = client.branches(repo_name)
      branches.each do |branch|
        commits = repo_commits(repo_name, branch.name)
        repos[repo_name] << {branch_name: branch.name, commits: commits}
      end
    end
    return repos
  end

end