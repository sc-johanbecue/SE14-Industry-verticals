// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as ThemeEditor from 'src/components/theme-editor/ThemeEditor';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SocialFeed from 'src/components/social-feed/SocialFeed';
import * as SelectedProducts from 'src/components/selected-products/SelectedProducts';
import * as SectionWrapper from 'src/components/section-wrapper/SectionWrapper';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as ProductListing from 'src/components/product-listing/ProductListing';
import * as ProductDetails from 'src/components/product-details/ProductDetails';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageHeader from 'src/components/page-header/PageHeader';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Offers from 'src/components/offers/Offers';
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
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as BupaLinkBoxSection from 'src/components/bupa/BupaLinkBoxSection';
import * as BupaLinkBoxCard from 'src/components/bupa/BupaLinkBoxCard';
import * as BupaImageLinkBoxSection from 'src/components/bupa/BupaImageLinkBoxSection';
import * as BupaImageLinkBoxCard from 'src/components/bupa/BupaImageLinkBoxCard';
import * as BupaImageContentBlock from 'src/components/bupa/BupaImageContentBlock';
import * as BupaHeroSection from 'src/components/bupa/BupaHeroSection';
import * as BupaHeroCard from 'src/components/bupa/BupaHeroCard';
import * as BupaHeader from 'src/components/bupa/BupaHeader';
import * as BupaFooter from 'src/components/bupa/BupaFooter';
import * as BupaContentBlock from 'src/components/bupa/BupaContentBlock';
import * as BupaBoxSection from 'src/components/bupa/BupaBoxSection';
import * as BupaBoxCard from 'src/components/bupa/BupaBoxCard';
import * as bupaherodesktopbgcontext from 'src/components/bupa/bupa-hero-desktop-bg-context';
import * as SimpleExampleSection from 'src/components/bupa/SEComponentExamples/SectionCard/SimpleExample Section';
import * as SimpleExampleCard from 'src/components/bupa/SEComponentExamples/SectionCard/SimpleExample Card';
import * as ExampleTabsTab from 'src/components/bupa/SEComponentExamples/Example Tabs/ExampleTabs - Tab';
import * as ExampleTabsSection from 'src/components/bupa/SEComponentExamples/Example Tabs/ExampleTabs - Section';
import * as ExampleTabsCard from 'src/components/bupa/SEComponentExamples/Example Tabs/ExampleTabs - Card';
import * as ExampleCarouselSection from 'src/components/bupa/SEComponentExamples/CarouselCard/ExampleCarouselSection';
import * as ExampleCarouselCard from 'src/components/bupa/SEComponentExamples/CarouselCard/ExampleCarouselCard';
import * as BupaCorporateThinkingSection from 'src/components/bupa/corporate/BupaCorporateThinkingSection';
import * as BupaCorporateThinkingCard from 'src/components/bupa/corporate/BupaCorporateThinkingCard';
import * as BupaCorporateStatsSection from 'src/components/bupa/corporate/BupaCorporateStatsSection';
import * as BupaCorporateSplitFeature from 'src/components/bupa/corporate/BupaCorporateSplitFeature';
import * as BupaCorporatePromoBand from 'src/components/bupa/corporate/BupaCorporatePromoBand';
import * as BupaCorporateHorizontalFeature from 'src/components/bupa/corporate/BupaCorporateHorizontalFeature';
import * as BupaCorporateHeroSection from 'src/components/bupa/corporate/BupaCorporateHeroSection';
import * as BupaCorporateHeroCard from 'src/components/bupa/corporate/BupaCorporateHeroCard';
import * as BupaCorporateHeader from 'src/components/bupa/corporate/BupaCorporateHeader';
import * as BupaCorporateFooter from 'src/components/bupa/corporate/BupaCorporateFooter';
import * as BupaCorporateFinancialStrip from 'src/components/bupa/corporate/BupaCorporateFinancialStrip';
import * as bupacorporateherodesktopbgcontext from 'src/components/bupa/corporate/bupa-corporate-hero-desktop-bg-context';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['ThemeEditor', { ...ThemeEditor }],
  ['SocialFollow', { ...SocialFollow }],
  ['SocialFeed', { ...SocialFeed }],
  ['SelectedProducts', { ...SelectedProducts }],
  ['SectionWrapper', { ...SectionWrapper }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['ProductListing', { ...ProductListing }],
  ['ProductDetails', { ...ProductDetails }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageHeader', { ...PageHeader }],
  ['PageContent', { ...PageContent }],
  ['Offers', { ...Offers }],
  ['NavigationIcons', { ...NavigationIcons }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList, componentType: 'client' }],
  ['LanguageSwitcher', { ...LanguageSwitcher, componentType: 'client' }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner }],
  ['Header', { ...Header, componentType: 'client' }],
  ['Footer', { ...Footer }],
  ['Features', { ...Features }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['BupaLinkBoxSection', { ...BupaLinkBoxSection, componentType: 'client' }],
  ['BupaLinkBoxCard', { ...BupaLinkBoxCard, componentType: 'client' }],
  ['BupaImageLinkBoxSection', { ...BupaImageLinkBoxSection, componentType: 'client' }],
  ['BupaImageLinkBoxCard', { ...BupaImageLinkBoxCard, componentType: 'client' }],
  ['BupaImageContentBlock', { ...BupaImageContentBlock, componentType: 'client' }],
  ['BupaHeroSection', { ...BupaHeroSection, componentType: 'client' }],
  ['BupaHeroCard', { ...BupaHeroCard, componentType: 'client' }],
  ['BupaHeader', { ...BupaHeader, componentType: 'client' }],
  ['BupaFooter', { ...BupaFooter, componentType: 'client' }],
  ['BupaContentBlock', { ...BupaContentBlock, componentType: 'client' }],
  ['BupaBoxSection', { ...BupaBoxSection, componentType: 'client' }],
  ['BupaBoxCard', { ...BupaBoxCard, componentType: 'client' }],
  ['bupa-hero-desktop-bg-context', { ...bupaherodesktopbgcontext, componentType: 'client' }],
  ['SimpleExample Section', { ...SimpleExampleSection, componentType: 'client' }],
  ['SimpleExample Card', { ...SimpleExampleCard, componentType: 'client' }],
  ['ExampleTabs - Tab', { ...ExampleTabsTab, componentType: 'client' }],
  ['ExampleTabs - Section', { ...ExampleTabsSection, componentType: 'client' }],
  ['ExampleTabs - Card', { ...ExampleTabsCard, componentType: 'client' }],
  ['ExampleCarouselSection', { ...ExampleCarouselSection, componentType: 'client' }],
  ['ExampleCarouselCard', { ...ExampleCarouselCard, componentType: 'client' }],
  ['BupaCorporateThinkingSection', { ...BupaCorporateThinkingSection, componentType: 'client' }],
  ['BupaCorporateThinkingCard', { ...BupaCorporateThinkingCard, componentType: 'client' }],
  ['BupaCorporateStatsSection', { ...BupaCorporateStatsSection, componentType: 'client' }],
  ['BupaCorporateSplitFeature', { ...BupaCorporateSplitFeature, componentType: 'client' }],
  ['BupaCorporatePromoBand', { ...BupaCorporatePromoBand, componentType: 'client' }],
  ['BupaCorporateHorizontalFeature', { ...BupaCorporateHorizontalFeature, componentType: 'client' }],
  ['BupaCorporateHeroSection', { ...BupaCorporateHeroSection, componentType: 'client' }],
  ['BupaCorporateHeroCard', { ...BupaCorporateHeroCard, componentType: 'client' }],
  ['BupaCorporateHeader', { ...BupaCorporateHeader, componentType: 'client' }],
  ['BupaCorporateFooter', { ...BupaCorporateFooter, componentType: 'client' }],
  ['BupaCorporateFinancialStrip', { ...BupaCorporateFinancialStrip, componentType: 'client' }],
  ['bupa-corporate-hero-desktop-bg-context', { ...bupacorporateherodesktopbgcontext, componentType: 'client' }],
]);

export default componentMap;
