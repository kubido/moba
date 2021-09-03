module Github

  def client 
    client = Octokit::Client.new(:access_token => ENV['GITHUB_ACCESS_TOKEN'])
  end

  def get_repos(github_user, options={})
    user = client.user github_user
    github_repos = client.organization_repositories(github_user, {type: 'all', direction: 'desc'  })
    repos = {}
    github_repos.select do |repo| 
      repo_name = repo.full_name
      repos[repo_name] = [] if repo_name.include? options[:filter] 
    end
    return repos
  end
  
 
  def repo_commits(repo_name, branch_name=nil)
    commits = []
    user_commits = client.commits(repo_name, branch_name, {per_page: 100})
    puts "#{branch_name} #{user_commits.count}"
    user_commits.each do |git_commit|
      commit = git_commit.commit.to_hash
      commits << {
        message: commit[:message],
        author: commit[:author],
        commiter: commit[:committer],
        tree: commit[:tree],
        url: commit[:url],
        comment_count: commit[:comment_count]
      }
    end
    commits
  end
  
  def get_all_repos_with_commits(github_user, options={})
    repos = get_repos(github_user, options)
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