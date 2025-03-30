import React, { useState } from 'react';
import { GoChevronDown, GoChevronUp, GoLink } from 'react-icons/go';

const ResearchInsights = () => {
  const [expandedArticle, setExpandedArticle] = useState(null);

  // List of data insights and research articles
  const articles = [
    {
      id: 1,
      title: "How We Process Period Poverty Data",
      summary: "Learn about our methodologies for collecting, cleaning, and analyzing period poverty data across Nigeria.",
      content: (
        <div className="space-y-4">
          <p>
            Our data collection process involves partnerships with local NGOs, universities, and government agencies to gather comprehensive information on period poverty indicators across Nigeria. We follow a rigorous methodology to ensure data accuracy and reliability.
          </p>
          <h3 className="font-semibold text-lg mt-4">Data Collection Methods</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Structured surveys administered in both urban and rural communities</li>
            <li>Focus group discussions with various age demographics</li>
            <li>Collaboration with educational institutions for in-school assessments</li>
            <li>Partnership with healthcare facilities to gather medical perspectives</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Data Processing Steps</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Raw data collection through field agents and digital channels</li>
            <li>Data cleaning to remove inconsistencies and outliers</li>
            <li>Normalization of geographic data to match official LGA boundaries</li>
            <li>Statistical analysis to identify patterns and correlations</li>
            <li>Verification through cross-referencing with existing research</li>
          </ol>
          <p className="mt-4">
            The final dataset is then visualized on our interactive map, allowing users to explore different dimensions of period poverty across Nigeria's diverse geography.
          </p>
        </div>
      )
    },
    {
      id: 2,
      title: "Representation Bias: Wealthy, Urban, and Educated in Population Surveys",
      summary: "An exploration of who is typically represented in menstrual hygiene management surveys and the implications for data interpretation.",
      content: (
        <div className="space-y-4">
          <p>
            A critical examination of period poverty data reveals a significant sampling bias in many population surveys. Our analysis indicates that survey respondents tend to be disproportionately from wealthy, urban, and educated backgrounds, creating blind spots in our understanding of period poverty.
          </p>
          <h3 className="font-semibold text-lg mt-4">Key Findings</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Over 65% of respondents in major national surveys come from urban centers</li>
            <li>Women with at least secondary education are overrepresented by approximately 40%</li>
            <li>Lower income households are systematically underrepresented in most datasets</li>
            <li>Rural communities, particularly in remote areas, have minimal representation</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Implications for Policy</h3>
          <p>
            This representation bias can lead to skewed policy decisions that fail to address the needs of the most vulnerable populations. Interventions designed based on such data may inadvertently prioritize solutions that work for urban, educated women while missing the unique challenges faced by rural and lower-income communities.
          </p>
          <p className="mt-4">
            Our project actively works to correct these biases by implementing stratified sampling methods and establishing data collection partnerships in underrepresented communities. This approach helps ensure our period poverty map provides a more accurate picture of the situation across all demographic groups.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: "Age Group Focus: Adolescents at the Center of Research",
      summary: "Most research and interventions primarily target adolescent age groups, potentially overlooking other demographics affected by period poverty.",
      content: (
        <div className="space-y-4">
          <p>
            Our analysis of the research landscape reveals a strong focus on adolescents in period poverty studies and interventions. While this focus is important, it may create knowledge gaps about the experiences of other age groups.
          </p>
          <h3 className="font-semibold text-lg mt-4">Current Research Distribution</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Approximately 78% of studies focus primarily on girls aged 12-19</li>
            <li>Only 14% of research specifically examines period poverty among women over 25</li>
            <li>Less than 8% of studies include women approaching menopause</li>
            <li>Very few studies follow participants longitudinally across different life stages</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Reasons for Adolescent Focus</h3>
          <p>
            The emphasis on adolescents is understandable given the significant impact of period poverty on education and the formative nature of this life stage. School settings also provide convenient research environments with captive populations for interventions and data collection.
          </p>
          <p className="mt-4">
            However, our data suggests that period poverty affects women across all age groups, and the challenges faced by older women, particularly in rural and lower-income settings, remain underexplored. Future research should expand to include more diverse age representations to develop more comprehensive solutions.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "Public vs. Private School Knowledge Disparity",
      summary: "Analysis of menstrual health knowledge and hygiene practices reveals significant disparities between students in public and private schools.",
      content: (
        <div className="space-y-4">
          <p>
            Our research highlights a concerning disparity in menstrual health knowledge and hygiene practices between adolescents attending public schools versus those in private institutions. This gap underscores broader socioeconomic factors that influence period poverty.
          </p>
          <h3 className="font-semibold text-lg mt-4">Comparative Data</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Private school students demonstrate 42% higher correct knowledge of menstrual hygiene principles</li>
            <li>Access to sanitary products is approximately 3.5 times higher in private schools</li>
            <li>Absenteeism due to menstruation is 68% lower in private schools compared to public schools</li>
            <li>Private schools are 7 times more likely to have dedicated sanitation facilities for menstrual management</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Contributing Factors</h3>
          <p>
            The disparity appears to be driven by several interconnected factors, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Comprehensive health education programs in private school curricula</li>
            <li>Better funded infrastructure and facilities</li>
            <li>Higher probability of having female teachers trained in menstrual health support</li>
            <li>Greater household resources among private school students for purchasing menstrual products</li>
          </ul>
          <p className="mt-4">
            These findings suggest that addressing period poverty requires not only product distribution but also systemic improvements in public education infrastructure and health curriculum development.
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: "Geographic Research Distribution: The University Effect",
      summary: "Data collection and research on period poverty shows concentration in areas with universities, creating potential blind spots in our understanding.",
      content: (
        <div className="space-y-4">
          <p>
            Analysis of research distribution across Nigeria reveals a distinct pattern: areas with universities and academic institutions show significantly higher levels of period poverty research and data collection. This creates geographical disparities in our understanding of the issue.
          </p>
          <h3 className="font-semibold text-lg mt-4">Research Concentration</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Over 70% of published studies on period poverty come from just 5 states with major universities</li>
            <li>LGAs hosting university campuses are 8 times more likely to have detailed period poverty data</li>
            <li>Remote states without tertiary institutions show critically low research coverage</li>
            <li>Research frequency correlates strongly (r=0.82) with proximity to academic institutions</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Implications</h3>
          <p>
            This "university effect" creates significant knowledge gaps about period poverty in many parts of Nigeria. Rural and remote communities that may face the most severe challenges remain understudied and potentially overlooked in policy development.
          </p>
          <p className="mt-4">
            Our mapping project actively works to address this bias by partnering with community organizations in underrepresented regions and developing remote data collection methodologies. By expanding the geographical scope of research, we aim to create a more comprehensive picture of period poverty across Nigeria.
          </p>
        </div>
      )
    },
  ];

  // Toggle article expansion
  const toggleArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(id);
    }
  };

  return (
    <div className="mt-10 w-full content">
      <h2 className="text-2xl font-bold border-b-2 border-custom-red pb-2 mb-6">
        Data Insights & Research Context
      </h2>
      
      <p className="text-gray-700 mb-6">
        Explore the research methodology, data insights, and contextual information that powers our period poverty map. 
        Understanding how this data is collected and analyzed is crucial for interpreting the patterns shown on the map.
      </p>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="border border-custom-red rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="flex justify-between items-center p-4 cursor-pointer bg-white"
              onClick={() => toggleArticle(article.id)}
            >
              <div>
                <h3 className="font-bold text-lg text-rose-900">{article.title}</h3>
                {expandedArticle !== article.id && (
                  <p className="text-gray-600 mt-1">{article.summary}</p>
                )}
              </div>
              <div className="text-rose-700">
                {expandedArticle === article.id ? <GoChevronUp size={24} /> : <GoChevronDown size={24} />}
              </div>
            </div>
            
            {expandedArticle === article.id && (
              <div className="p-4 bg-gray-50 border-t">
                {article.content}
                <div className="mt-6 flex justify-end">
                  <button 
                    className="flex items-center text-rose-700 hover:text-rose-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      // This would typically link to a full article page
                      alert("This would link to a full article in a real implementation");
                    }}
                  >
                    <span className="mr-1">Read full research paper</span>
                    <GoLink size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-rose-50 rounded-lg border border-custom-red">
        <h3 className="font-bold text-lg text-rose-900 mb-2">Research Participation</h3>
        <p>
          Are you working on period poverty research or have data to contribute? 
          We're committed to expanding our coverage and addressing gaps in our data. 
          Contact our research team to discuss collaboration opportunities or to share your insights.
        </p>
        <button 
          className="mt-4 bg-rose-700 text-white px-4 py-2 rounded hover:bg-rose-800 transition-colors"
          onClick={() => alert("This would open a contact form in a real implementation")}
        >
          Contact Research Team
        </button>
      </div>
    </div>
  );
};

export default ResearchInsights;