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
        // Check if report exists (by associate + call date)
        const existing = reports.find(r=>r.username===report.username && r.callDate===report.callDate);
        if(existing){
            // Update all fields
            Object.assign(existing, report);
        } else {
            reports.push(report);
        }
        saveReports(reports);
    }

    // Get reports by leader
    function getReportsByLeader(leader){
        return getReports().filter(r=>r.leader === leader);
    }

    // Get reports by associate
    function getReportsByAssociate(username){
        return getReports().filter(r=>r.username === username);
    }

    return {
        getReports,
        saveReports,
        addOrUpdateReport,
        getReportsByLeader,
        getReportsByAssociate
    };
})();
