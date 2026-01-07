// storage.js
// Centralized storage for QC reports and users

const Storage = (function(){

    // Fetch all QC reports
    function getReports(){
        return JSON.parse(localStorage.getItem('qualityReports')) || [];
    }

    // Save all QC reports
    function saveReports(reports){
        localStorage.setItem('qualityReports', JSON.stringify(reports));
    }

    // Add or update a report
    function addOrUpdateReport(report){
        let reports = getReports();
        const existing = reports.find(r => r.username === report.username && r.callDate === report.callDate);
        if(existing){
            Object.assign(existing, report); // Update
        } else {
            reports.push(report); // Add new
        }
        saveReports(reports);
    }

    // Get reports by leader
    function getReportsByLeader(leader){
        return getReports().filter(r => r.leader === leader);
    }

    // Get reports by associate
    function getReportsByAssociate(username){
        return getReports().filter(r => r.username === username);
    }

    return {
        getReports,
        saveReports,
        addOrUpdateReport,
        getReportsByLeader,
        getReportsByAssociate
    };
})();
