import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'A3rdPartyRestWebPartStrings';
import A3rdPartyRest from './components/A3rdPartyRest';
import { IA3rdPartyRestProps } from './components/IA3rdPartyRestProps';
import { intersection } from '@microsoft/sp-lodash-subset';

export interface IA3rdPartyRestWebPartProps {
  description: string;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUser {
  id: number;
  name?: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone:string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export default class A3rdPartyRestWebPart extends BaseClientSideWebPart<IA3rdPartyRestWebPartProps> {

  private makeRequest(): Promise<IUser[]> {

    const postURL = "https://jsonplaceholder.typicode.com/users";
  
    const body: string = JSON.stringify({
      
    });
  
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');
    requestHeaders.append('Cache-Control', 'no-cache');
    //For an OAuth token
    //requestHeaders.append('Authorization', 'Bearer <TOKEN>');
    //For Basic authentication
    //requestHeaders.append('Authorization', 'Basic <CREDENTIALS>');
  
    const httpClientOptions: IHttpClientOptions = {      
      headers: requestHeaders
    };
  
    console.log("About to make REST API request.");
  
    return this.context.httpClient.get(    
      postURL,
      HttpClient.configurations.v1,
      httpClientOptions)
      .then((response: HttpClientResponse): Promise<IUser[]> => {
        console.log("REST API response received.");
       
        return response.json();
      });
  }

  public render(): void {
    this.makeRequest().then((users: IUser[]) => {
      console.log(users);
      const element: React.ReactElement<IA3rdPartyRestProps > = React.createElement(
        A3rdPartyRest,
        {
          users: users
        }
      );
  
      ReactDom.render(element, this.domElement);
    });
    
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
