import React, { useState } from 'react';
import { FaFilePdf, FaDownload, FaSpinner, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Document, Page, Text, View, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #e2e8f0',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1e293b',
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    minHeight: 30,
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
  },
  tableCell: {
    padding: 5,
    fontSize: 12,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#1e293b',
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 12,
    color: '#1e293b',
    marginBottom: 5,
  },
  gradeBadge: {
    padding: '2 8',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
  },
  retakeBadge: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  semesterHeader: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  semesterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  semesterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statItem: {
    fontSize: 12,
    color: '#475569',
  },
});

const GenerateSemesterReport = ({ results, retakenCourses = [] }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatGrade = (grade) => {
    if (grade === 'A+' || grade === 'A') return { bg: '#dcfce7', text: '#166534' };
    if (grade === 'A-' || grade === 'B+') return { bg: '#dbeafe', text: '#1e40af' };
    if (grade === 'B' || grade === 'B-') return { bg: '#e0e7ff', text: '#3730a3' };
    if (grade === 'C+' || grade === 'C') return { bg: '#fef9c3', text: '#854d0e' };
    return { bg: '#fee2e2', text: '#dc2626' };
  };

  const calculateSGPA = (semester) => {
    const totalPoints = semester.data.reduce((acc, course) => acc + (course.pointEquivalent * course.totalCredit), 0);
    const totalCredits = semester.data.reduce((acc, course) => acc + course.totalCredit, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
  };

  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Academic Performance Report</Text>
          <Text style={styles.subtitle}>Generated on: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Overall Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Summary</Text>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Total Semesters: {results.length}
            </Text>
            <Text style={styles.summaryText}>
              Total Credits: {results.reduce((acc, sem) => acc + (sem.totalCredits || 0), 0)}
            </Text>
            <Text style={styles.summaryText}>
              Total Courses: {results.reduce((acc, sem) => acc + (sem.data.length || 0), 0)}
            </Text>
          </View>
        </View>

        {/* Semester-wise Results */}
        {results.map((semester, semesterIndex) => (
          <View key={semester.semesterName} style={styles.section}>
            {/* Semester Header */}
            <View style={styles.semesterHeader}>
              <Text style={styles.semesterTitle}>{semester.semesterName}</Text>
              <View style={styles.semesterStats}>
                <Text style={styles.statItem}>SGPA: {calculateSGPA(semester)}</Text>
                <Text style={styles.statItem}>Credits: {semester.totalCredits}</Text>
                <Text style={styles.statItem}>Courses: {semester.data.length}</Text>
              </View>
            </View>

            {/* Course Details Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 3 }]}>Course Title</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Credits</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Point</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Grade</Text>
              </View>

              {/* Table Rows */}
              {semester.data.map((course, courseIndex) => {
                const isRetaken = retakenCourses[semesterIndex]?.includes(course.courseTitle);
                const gradeStyle = formatGrade(course.gradeLetter);

                return (
                  <View key={courseIndex} style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 3 }]}>
                      {course.courseTitle}
                      {isRetaken && (
                        <Text style={{ color: '#dc2626', marginLeft: 5 }}>(Retake)</Text>
                      )}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{course.totalCredit}</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{course.pointEquivalent}</Text>
                    <Text style={[styles.tableCell, { flex: 1, color: gradeStyle.text }]}>
                      <Text style={[styles.gradeBadge, { backgroundColor: gradeStyle.bg }]}>
                        {course.gradeLetter}
                      </Text>
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );

  const handleGeneratePDF = () => {
    if (!results || results.length === 0) {
      console.error('No results data available');
      return;
    }
    setIsGenerating(true);
    setShowPreview(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const handleDownloadPDF = async () => {
    if (!results || results.length === 0) {
      console.error('No results data available');
      return;
    }

    try {
      setIsDownloading(true);
      const blob = await pdf(<PDFDocument />).toBlob();
      saveAs(blob, `academic-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
          isGenerating
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
        }`}
      >
        {isGenerating ? (
          <>
            <FaSpinner className="animate-spin" />
            Generating Report...
          </>
        ) : (
          <>
            <FaFilePdf />
            Generate Report
          </>
        )}
      </motion.button>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-4 w-[90vw] h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Report Preview</h3>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDownloading
                      ? 'bg-green-200 text-green-600 cursor-not-allowed'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <FaDownload />
                      Download PDF
                    </>
                  )}
                </motion.button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden">
              <PDFViewer width="100%" height="100%">
                <PDFDocument />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateSemesterReport; 