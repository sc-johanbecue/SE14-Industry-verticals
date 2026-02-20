// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as ThemeEditor from 'src/components/theme-editor/ThemeEditor';
import * as Subscribe from 'src/components/subscribe/Subscribe';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SocialFeed from 'src/components/social-feed/SocialFeed';
import * as SelectedProducts from 'src/components/selected-products/SelectedProducts';
import * as SelectedArticles from 'src/components/selected-articles/SelectedArticles';
import * as SectionWrapper from 'src/components/section-wrapper/SectionWrapper';
import * as SearchResults from 'src/components/search-results/SearchResults';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Reviews from 'src/components/reviews/Reviews';
import * as Promo from 'src/components/promo/Promo';
import * as ProductListing from 'src/components/product-listing/ProductListing';
import * as ProductDetails from 'src/components/product-details/ProductDetails';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Offers from 'src/components/offers/Offers';
import * as SuggestionBlock from 'src/components/non-sitecore/search/SuggestionBlock';
import * as Spinner from 'src/components/non-sitecore/search/Spinner';
import * as SortOrder from 'src/components/non-sitecore/search/SortOrder';
import * as SearchResultsComponent from 'src/components/non-sitecore/search/SearchResultsComponent';
import * as SearchPagination from 'src/components/non-sitecore/search/SearchPagination';
import * as SearchFacets from 'src/components/non-sitecore/search/SearchFacets';
import * as ResultsPerPage from 'src/components/non-sitecore/search/ResultsPerPage';
import * as QuestionsAnswers from 'src/components/non-sitecore/search/QuestionsAnswers';
import * as QueryResultsSummary from 'src/components/non-sitecore/search/QueryResultsSummary';
import * as PreviewSearch from 'src/components/non-sitecore/search/PreviewSearch';
import * as HomeHighlighted from 'src/components/non-sitecore/search/HomeHighlighted';
import * as CardViewSwitcher from 'src/components/non-sitecore/search/CardViewSwitcher';
import * as ArticleHorizontalCard from 'src/components/non-sitecore/search/ArticleHorizontalCard';
import * as ArticleCard from 'src/components/non-sitecore/search/ArticleCard';
import * as NavigationIcons from 'src/components/navigation-icons/NavigationIcons';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as LanguageSwitcher from 'src/components/language-switcher/LanguageSwitcher';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as Header from 'src/components/header/Header';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ContactForm from 'src/components/contact-form/ContactForm';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as Breadcrumb from 'src/components/breadcrumb/Breadcrumb';
import * as ArticleListing from 'src/components/article-listing/ArticleListing';
import * as ArticleDetails from 'src/components/article-details/ArticleDetails';
import * as AllProductsCarousel from 'src/components/all-products-carousel/AllProductsCarousel';


// Teamviewer components
import * as TeamviewerHeader from 'src/components/teamviewer/teamviewerHeader';
import * as TeamviewerFooter from 'src/components/teamviewer/teamviewerFooter';
import * as AddOnCard from 'src/components/teamviewer/AddOnCard';
import * as AddOnsSection from 'src/components/teamviewer/AddOnsSection';
import * as BenefitCard from 'src/components/teamviewer/BenefitCard';
import * as CTASection from 'src/components/teamviewer/CTASection';
import * as ComparisonSection from 'src/components/teamviewer/ComparisonSection';
import * as DiscoverSection from 'src/components/teamviewer/DiscoverSection';
import * as EnterpriseFeatureCard from 'src/components/teamviewer/EnterpriseFeatureCard';
import * as EnterpriseFeatureSection from 'src/components/teamviewer/EnterpriseFeatureSection';
import * as FAQCard from 'src/components/teamviewer/FAQCard';
import * as FAQSection from 'src/components/teamviewer/FAQSection';
import * as FeaturesSection from 'src/components/teamviewer/FeaturesSection';
import * as FeatureCard from 'src/components/teamviewer/FeatureCard';
import * as FooterBottomLinkCard from 'src/components/teamviewer/FooterBottomLinkCard';
import * as FooterCompact from 'src/components/teamviewer/FooterCompact';
import * as FooterLinkCard from 'src/components/teamviewer/FooterLinkCard';
import * as FooterLinkGroupCard from 'src/components/teamviewer/FooterLinkGroupCard';
import * as HeaderActionCard from 'src/components/teamviewer/HeaderActionCard';
import * as HeaderLogoCard from 'src/components/teamviewer/HeaderLogoCard';
import * as HeroSection from 'src/components/teamviewer/HeroSection';
import * as IndustryLeadersSection from 'src/components/teamviewer/IndustryLeadersSection';
import * as IntegrationsSection from 'src/components/teamviewer/IntegrationsSection';
import * as LogoCard from 'src/components/teamviewer/LogoCard';
import * as NavigationCard from 'src/components/teamviewer/NavigationCard';
import * as PricingCard from 'src/components/teamviewer/PricingCard';
import * as PricingCardsSection from 'src/components/teamviewer/PricingCardsSection';
import * as PricingHeroSection from 'src/components/teamviewer/PricingHeroSection';
import * as ProactiveITSection from 'src/components/teamviewer/ProactiveITSection';
import * as SecurityFeatureCard from 'src/components/teamviewer/SecurityFeatureCard';
import * as SecuritySection from 'src/components/teamviewer/SecuritySection';
import * as TestimonialCard from 'src/components/teamviewer/TestimonialCard';
import * as TrustedLogosSection from 'src/components/teamviewer/TrustedLogosSection';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['ThemeEditor', { ...ThemeEditor }],
  ['Subscribe', { ...Subscribe }],
  ['SocialFollow', { ...SocialFollow }],
  ['SocialFeed', { ...SocialFeed }],
  ['SelectedProducts', { ...SelectedProducts }],
  ['SelectedArticles', { ...SelectedArticles, componentType: 'client' }],
  ['SectionWrapper', { ...SectionWrapper }],
  ['SearchResults', { ...SearchResults }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Reviews', { ...Reviews }],
  ['Promo', { ...Promo }],
  ['ProductListing', { ...ProductListing }],
  ['ProductDetails', { ...ProductDetails }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Offers', { ...Offers }],
  ['SuggestionBlock', { ...SuggestionBlock }],
  ['Spinner', { ...Spinner }],
  ['SortOrder', { ...SortOrder }],
  ['SearchResultsComponent', { ...SearchResultsComponent }],
  ['SearchPagination', { ...SearchPagination }],
  ['SearchFacets', { ...SearchFacets }],
  ['ResultsPerPage', { ...ResultsPerPage }],
  ['QuestionsAnswers', { ...QuestionsAnswers }],
  ['QueryResultsSummary', { ...QueryResultsSummary }],
  ['PreviewSearch', { ...PreviewSearch }],
  ['HomeHighlighted', { ...HomeHighlighted }],
  ['CardViewSwitcher', { ...CardViewSwitcher }],
  ['ArticleHorizontalCard', { ...ArticleHorizontalCard }],
  ['ArticleCard', { ...ArticleCard }],
  ['NavigationIcons', { ...NavigationIcons }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['LanguageSwitcher', { ...LanguageSwitcher, componentType: 'client' }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner }],
  ['Header', { ...Header }],
  ['Footer', { ...Footer }],
  ['Features', { ...Features }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ContactForm', { ...ContactForm, componentType: 'client' }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['Breadcrumb', { ...Breadcrumb }],
  ['ArticleListing', { ...ArticleListing }],
  ['ArticleDetails', { ...ArticleDetails }],
  ['AllProductsCarousel', { ...AllProductsCarousel }],
  ['teamviewerHeader', { ...TeamviewerHeader }],
  ['teamviewerFooter', { ...TeamviewerFooter }],
  ['AddOnCard', { ...AddOnCard }],
  ['AddOnsSection', { ...AddOnsSection }],
  ['ComparisonSection', { ...ComparisonSection }],
  ['DiscoverSection', { ...DiscoverSection }],
  ['EnterpriseFeatureCard', { ...EnterpriseFeatureCard }],
  ['EnterpriseFeatureSection', { ...EnterpriseFeatureSection }],
  ['FAQCard', { ...FAQCard }],
  ['FAQSection', { ...FAQSection }],
  ['FeaturesSection', { ...FeaturesSection }],
  ['FeatureCard', { ...FeatureCard }],
  ['FooterBottomLinkCard', { ...FooterBottomLinkCard }],
  ['FooterCompact', { ...FooterCompact }],
  ['FooterLinkCard', { ...FooterLinkCard }],
  ['FooterLinkGroupCard', { ...FooterLinkGroupCard }],
  ['HeaderActionCard', { ...HeaderActionCard }],
  ['HeaderLogoCard', { ...HeaderLogoCard }],
  ['HeroSection', { ...HeroSection }],
  ['IndustryLeadersSection', { ...IndustryLeadersSection }],
  ['IntegrationsSection', { ...IntegrationsSection }],
  ['LogoCard', { ...LogoCard }],
  ['NavigationCard', { ...NavigationCard }],
  ['PricingCard', { ...PricingCard }],
  ['PricingHeroSection', { ...PricingHeroSection }],
  ['PricingCardsSection', { ...PricingCardsSection }],
  ['ProactiveITSection', { ...ProactiveITSection }],
  ['SecurityFeatureCard', { ...SecurityFeatureCard }],
  ['SecuritySection', { ...SecuritySection }],
  ['TestimonialCard', { ...TestimonialCard }],
  ['TrustedLogosSection', { ...TrustedLogosSection }],
  ['BenefitCard', { ...BenefitCard }],
  ['CTASection', { ...CTASection }],
]);

export default componentMap;
