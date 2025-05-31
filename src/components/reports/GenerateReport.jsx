import React, { useState } from 'react';
import { FaFilePdf, FaDownload, FaSpinner } from 'react-icons/fa';
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
});

const GenerateReport = ({ results, compareResults }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const calculateAverageCgpa = (semesters) => {
    if (!semesters || !Array.isArray(semesters) || semesters.length === 0) {
      return '0.00';
    }

    const { totalCgpa, totalCredits } = semesters.reduce(
      (acc, semester) => {
        if (semester?.cgpa && semester?.totalCredits) {
          acc.totalCgpa += semester.cgpa * semester.totalCredits;
          acc.totalCredits += semester.totalCredits;
        }
        return acc;
      },
      { totalCgpa: 0, totalCredits: 0 }
    );
    return totalCredits > 0 ? (totalCgpa / totalCredits).toFixed(2) : '0.00';
  };

  const formatCGPA = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return Number(value).toFixed(2);
  };

  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Academic Performance Report</Text>
          <Text style={styles.subtitle}>Generated on: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Performance Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Summary</Text>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Average CGPA: {calculateAverageCgpa(results)}
            </Text>
            {compareResults && compareResults.length > 0 && (
              <Text style={styles.summaryText}>
                Comparison Average CGPA: {calculateAverageCgpa(compareResults)}
              </Text>
            )}
          </View>
        </View>

        {/* Semester-wise Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Semester-wise Results</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 2 }]}>Semester</Text>
              <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>CGPA</Text>
              {compareResults && compareResults.length > 0 && (
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Comparison CGPA</Text>
              )}
            </View>

            {/* Table Rows */}
            {results && results.map((semester, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {semester?.semesterName || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {formatCGPA(semester?.cgpa)}
                </Text>
                {compareResults && compareResults.length > 0 && (
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {formatCGPA(compareResults[index]?.cgpa)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
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
    // Simulate PDF generation delay
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
        <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Report Preview</h3>
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
          </div>
          <div className="h-[600px] border border-slate-200 rounded-lg overflow-hidden">
            <PDFViewer width="100%" height="100%">
              <PDFDocument />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateReport; 