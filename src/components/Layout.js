import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {withPrefix} from '../utils';
import '../sass/main.scss';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        let title = _.get(this.props, 'pageContext.frontmatter.title', null) + ' | ' + _.get(this.props, 'pageContext.site.siteMetadata.title', null);
        let canonical_url = '';
        let font = _.get(this.props, 'pageContext.site.siteMetadata.base_font', null) || 'nunito-sans';
        if (_.get(this.props, 'pageContext.frontmatter.seo.title', null)) {
             title = _.get(this.props, 'pageContext.frontmatter.seo.title', null);
        }
        if (_.get(this.props, 'pageContext.frontmatter.seo.canonical_url', null)) {
             canonical_url = _.get(this.props, 'pageContext.frontmatter.seo.canonical_url', null);
        }
        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.seo.description', null) || ''} />
                    {_.get(this.props, 'pageContext.frontmatter.seo.robots', null) && (
                    <meta name="robots" content={_.join(_.get(this.props, 'pageContext.frontmatter.seo.robots', null), ',')}/>
                    )}
                    {canonical_url && (
                    <link rel="canonical" href={canonical_url} />
                    )}
                    {_.map(_.get(this.props, 'pageContext.frontmatter.seo.extra', null), (meta, meta_idx) => (
                      _.get(meta, 'name', null).startsWith('og:') ? (
                      <meta key={meta_idx} property={_.get(meta, 'name', null)} content={_.get(meta, 'value', null)}/>
                      ) : 
                      <meta key={meta_idx + '.1'} name={_.get(meta, 'name', null)} content={_.get(meta, 'value', null)}/>
                    ))}
                    {(font !== 'system-sans') && (
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    )}
                    {(font === 'nunito-sans') ? (
                    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    ) : ((font === 'fira-sans') && (
                    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet"/>
                    ))}
                    {_.get(this.props, 'pageContext.site.siteMetadata.favicon', null) && (
                    <link rel="icon" href={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.favicon', null))}/>
                    )}
                    <body className={'palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette', null) + ' font-' + _.get(this.props, 'pageContext.site.siteMetadata.base_font', null)} />
                </Helmet>
                <div id="page" className="site">
                  <Header {...this.props} />
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}
