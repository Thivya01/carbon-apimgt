/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Loading from '../../Base/Loading/Loading'
import ResourceNotFound from "../../Base/Errors/ResourceNotFound";
import Api from '../../../data/api'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ImageGenerator from "../Listing/ImageGenerator"
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Subscribe from './Subscribe'
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
        marginBottom: 20,
    },
    imageSideContent: {
        display: 'inline-block',
        paddingLeft: 20,
    },
    imageWrapper: {
        display: 'flex',
        flexAlign: 'top',
    },
    headline: {
        marginTop: 20
    },
    titleCase: {
        textTransform: 'capitalize',
    },
    chip: {
        marginLeft: 0,
        cursor: 'pointer',
    },
    openNewIcon: {
        display: 'inline-block',
        marginLeft: 20,
    },
    endpointsWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
    }
});

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: null,
            applications: null,
            policies: null,
            dropDownApplications: null,
            dropDownPolicies: null,
            notFound: false,
            tabValue: "Social Sites",
            comment: '',
            commentList: null
        };
        this.api_uuid = this.props.api_uuid;
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        const api = new Api();
        let promised_api = api.getAPIById(this.api_uuid);
        promised_api.then(
            response => {
                this.setState({api: response.obj});
                //this.props.setDetailsAPI(response.obj);
            }
        ).catch(
            error => {
                if (process.env.NODE_ENV !== "production") {
                    console.log(error);
                }
                let status = error.status;
                if (status === 404) {
                    this.setState({notFound: true});
                }
            }
        );

        let promised_applications = api.getAllApplications();
        promised_applications.then(
            response => {
                this.setState({applications: response.obj.list});
            }
        ).catch(
            error => {
                if (process.env.NODE_ENV !== "production") {
                    console.log(error);
                }
                let status = error.status;
                if (status === 404) {
                    this.setState({notFound: true});
                }
            }
        );

        let promised_subscriptions = api.getSubscriptions(this.api_uuid, null);
        promised_subscriptions.then(
            response => {

            }
        ).catch(
            error => {
                if (process.env.NODE_ENV !== "production") {
                    console.log(error);
                }
                let status = error.status;
                if (status === 404) {
                    this.setState({notFound: true});
                }
            }
        );
    }

    handleClick() {
        this.setState({redirect: true});
    }

    handleTabChange = (event, tabValue) => {
        this.setState({tabValue: tabValue});
    };

    render() {
        const api = this.state.api;
        if (this.state.notFound) {
            return <ResourceNotFound message={this.props.resourceNotFountMessage}/>
        }
        if (!api) {
            return <Loading/>
        }
        const { classes } = this.props;
        return (
            
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Typography variant="display1" >
                        {api.name}
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} className={classes.imageWrapper}>
                    <ImageGenerator apiName={api.name} />
                    <div className={classes.imageSideContent}>
                        <Typography variant="headline" >
                            {api.version} {api.isDefaultVersion ? <span>( Default )</span> : <span></span>}
                            {/* TODO We need to show the default verison and a link to it here if this
                            is not the default version*/}
                        </Typography>
                        <Typography variant="caption" gutterBottom align="left">
                            Version
                        </Typography>
                        {/* Context */}
                        <Typography variant="headline" className={classes.headline} >
                            {api.context}
                        </Typography>
                        <Typography variant="caption" gutterBottom align="left">
                            Context
                        </Typography>
                        {/*Visibility */}
                        <Typography variant="headline" className={classes.headline}>
                            {api.lifeCycleStatus}
                        </Typography>
                        <Typography variant="caption" gutterBottom align="left">
                            Lifecycle Status
                        </Typography>
                    </div>
                    <div>
                        <Subscribe uuid={this.props.api_uuid}/>
                    </div>

                </Grid>
            </Grid>
        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
