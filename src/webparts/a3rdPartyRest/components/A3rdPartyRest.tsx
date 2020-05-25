import * as React from 'react';
import styles from './A3rdPartyRest.module.scss';
import { IA3rdPartyRestProps } from './IA3rdPartyRestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IUser, IPost } from '../A3rdPartyRestWebPart';

export default class A3rdPartyRest extends React.Component<IA3rdPartyRestProps, {}> {
  public render(): React.ReactElement<IA3rdPartyRestProps> {
    return (
      <div>
        
          {this.props.users.map((value: IUser, index: number) =>             
            <div>
              <h3>{value.name}</h3>
              <table>
                <tr>
                  <td>Company: {value.company.name}</td>
                  <td>Email: {value.email}</td>
                </tr>
              </table>
            </div>
          )}
        
      </div>
    );
  }
}
