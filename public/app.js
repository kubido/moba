const DATA_KEY = "h8cohorts"

function init(api_url) {
  let cohorts = localStorage[DATA_KEY] || "{}"
  cohorts = JSON.parse(cohorts)

  return {
    base_url: api_url,
    viewType: "table",
    sortDirection: 1,
    sortSelected: null,
    users: [],
    alerts: [],
    repos: {},
    branchDetail: {},
    selectedRepo: null,
    selectedRepoBranches: [],
    cohorts: Object.keys(cohorts),
    dropdown: false,
    title: "GCH - Git Commit History",
    page: location.hash,
    form: {
      name: '',
      text: ''
    },
    selectRepoHandler() {
      this.selectedRepoBranches = this.repos[this.selectedRepo]
    },
    parsedData() {
      let commits = []
      let branchGroups = []
      let id = 1
      this.selectedRepoBranches.forEach((branch, bid) => {
        let branchId = bid + 1
        branchGroups.push({ id: branchId, title: branch.branch_name })
        branch.commits.forEach((commit, cid) => {

          commits.push({
            id,
            start: commit.author.date.split(" ")[0],
            end: commit.author.date.split(" ")[0],
            title: commit.message,
            resourceId: branchId
          })
          id++
        })
      })
      return { commits, branchGroups }
    },
    formatDate(dateParams) {
      let date = new Date(dateParams)
      return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(date)
    },
    displayCalendar() {
      let { commits, branchGroups } = this.parsedData()
      console.log(branchGroups);
      console.log(commits);

      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC',
        initialView: 'resourceTimelineDay',
        aspectRatio: 1.5,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        },
        editable: true,
        resourceAreaHeaderContent: 'Branch',
        resources: branchGroups,
        events: commits
      });
      this.viewType = this.viewType == "table" ? "timeline" : "table"
      calendar.render();
    },
    sort(data, key) {
      this[data] = this[data].sort((b, a) => {
        if (key === "commits") {
          return a[key].length < b[key].length ? -this.sortDirection : this.sortDirection
        } else {
          return a[key] < b[key] ? -this.sortDirection : this.sortDirection
        }
      })
      this.sortDirection = -this.sortDirection
      this.sortSelected = key

    },
    selectBranchHandler(branchName) {
      this.branchDetail = this.selectedRepoBranches.filter(branch => branch.branch_name === branchName)[0]

      location.hash = "branch_" + this.branchDetail.branch_name
    },

    fetchRepoCommits() {
      let url = this.base_url + '/hooks/github'
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ cache: true })
      })
        .then(resp => resp.json())
        .then(data => {
          this.repos = data
        })

    },
    getGroups() {
      let cohorts = localStorage[DATA_KEY]
      cohorts = JSON.parse(cohorts)
      return Object.keys(cohorts)
    },
    cohortSelectHandler(event) {

    },
    pasteHandler(event) {
      let text = event.target.value
      let rows = text.split('\n').map(row => {
        return row.split('\t')
      })
      this.users = rows
    },
    pageChangeHandler(event) {
      this.page = location.hash
    },
    saveGroup() {
      try {
        let cohorts = localStorage[DATA_KEY] || "{}"
        cohorts = JSON.parse(cohorts)
        cohorts[this.form.name] = this.users
        localStorage.setItem(DATA_KEY, JSON.stringify(cohorts))
        this.cohorts = Object.keys(cohorts)
        this.alerts.push({ status: 'success', message: 'Successfully add' })
      } catch (error) {
        this.alerts.push({ status: 'danger', message: error.message })
      }
      setTimeout(() => {
        this.alert = []
      }, 2000);
    }
  }
}