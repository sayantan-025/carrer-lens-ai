import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useEffect, useCallback } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";
import { useAuth } from "../../auth/hooks/use-auth";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId: routeId } = useParams();
  const { isAuthenticated } = useAuth();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    error,
    setError,
  } = context;

  const generateReport = useCallback(
    async ({ jobDescription, selfDescription, resumeFile }) => {
      setLoading(true);
      let response = null;
      try {
        response = await generateInterviewReport({
          jobDescription,
          selfDescription,
          resumeFile,
        });
        if (response?.interviewReport) {
          setReport(response.interviewReport);
        }
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to generate report");
      } finally {
        setLoading(false);
      }

      return response?.interviewReport;
    },
    [setLoading, setReport, setError],
  );

  const getReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      let response = null;
      try {
        response = await getInterviewReportById(interviewId);
        if (response?.interviewReport) {
          setReport(response.interviewReport);
        }
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Report not found");
      } finally {
        setLoading(false);
      }
      return response?.interviewReport;
    },
    [setLoading, setReport, setError],
  );

  const getReports = useCallback(async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      if (response?.interviewReports) {
        setReports(response.interviewReports);
      }
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }

    return response?.interviewReports;
  }, [setLoading, setReports, setError]);

  const getResumePdf = useCallback(
    async (interviewReportId) => {
      try {
        const response = await generateResumePdf({ interviewReportId });
        const url = window.URL.createObjectURL(
          new Blob([response], { type: "application/pdf" }),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `resume_${interviewReportId}.pdf`);
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [],
  );

  useEffect(() => {
    // Only fetch if we are authenticated
    if (isAuthenticated) {
      // If we are on a route with an ID (like dashboard), fetch that specific report
      if (routeId) {
        // Prevent re-fetching if we already have the correct report in state
        if (report?._id !== routeId) {
          getReportById(routeId);
        }
      } else {
        // Otherwise fetch all (like on the archives list) if we don't have them yet
        if (reports.length === 0) {
          getReports();
        }
      }
    }
  }, [
    routeId,
    isAuthenticated,
    getReportById,
    getReports,
    report?._id,
    reports.length,
  ]);

  return {
    loading,
    report,
    reports,
    error,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
