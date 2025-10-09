export const inviteMemberHtml = ({
  name,
  email,
  mailTo,
  acceptLink,
  declineLink,
  workspaceName,
}: {
  name: string;
  email: string;
  mailTo: string;
  acceptLink: string;
  declineLink: string;
  workspaceName: string;
}) => {
  return `  <div
      style="
        margin: 0;
        padding: 0;
        word-spacing: normal;
        background-color: #fbfaff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Axiforma', Helvetica, Arial, sans-serif !important;
      "
    >
      <div
        class="m_-5524253599865228502body"
        style="
          padding:12px;
          background-color: #fbfaff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            'Axiforma', Helvetica, Arial, sans-serif !important;
        "
        lang="en"
      >
        <div
          class="m_-5524253599865228502wp_1"
          style="
            background: #ffffff;
            background-color: #ffffff;
            margin: 0px auto;
            max-width: 440px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
              'Segoe UI', 'Axiforma', Helvetica, Arial, sans-serif !important;
            border-radius: 16px !important;
            border: 1px solid #ede9fe !important;
          "
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              border-collapse: collapse;
              background: #ffffff;
              background-color: #ffffff;
              width: 100%;
              border-radius: 16px;
            "
            width="100%"
            bgcolor="#ffffff"
          >
            <tbody>
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px;
                    text-align: center;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                      'Segoe UI', 'Axiforma', Helvetica, Arial, sans-serif !important;
                  "
                  align="center"
                >
                  <div
                    style="
                      margin: 0px auto;
                      max-width: 400px;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', 'Axiforma', Helvetica, Arial, sans-serif !important;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="border-collapse: collapse; width: 100%"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              direction: ltr;
                              font-size: 0px;
                              padding: 0px;
                              text-align: center;
                              font-family: system-ui, -apple-system,
                                BlinkMacSystemFont, 'Segoe UI', 'Axiforma',
                                Helvetica, Arial, sans-serif !important;
                            "
                            align="center"
                          >
                            <div
                              class="m_-5524253599865228502mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', 'Axiforma',
                                  Helvetica, Arial, sans-serif !important;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                                style="border-collapse: collapse"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        border-collapse: collapse;
                                        vertical-align: top;
                                        padding: 0px;
                                        font-family: system-ui, -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          'Axiforma', Helvetica, Arial,
                                          sans-serif !important;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="border-collapse: collapse"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="m_-5524253599865228502text_1"
                                              style="
                                                border-collapse: collapse;
                                                font-size: 0px;
                                                padding: 0px;
                                                word-break: break-word;
                                                font-family: system-ui,
                                                  -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  'Axiforma', Helvetica, Arial,
                                                  sans-serif !important;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-size: 16px;
                                                  font-weight: 600;
                                                  line-height: 24px;
                                                  text-align: left;
                                                  color: #202020;
                                                  font-family: system-ui,
                                                    -apple-system,
                                                    BlinkMacSystemFont,
                                                    'Segoe UI', 'Axiforma',
                                                    Helvetica, Arial, sans-serif !important;
                                                "
                                              >
                                               ${name} (<a
                                                  href=${mailTo}
                                                  target="_blank"
                                                  >${email}</a
                                                >) invited you to join Workspace
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    style="
                      margin: 0px auto;
                      max-width: 400px;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', 'Axiforma', Helvetica, Arial, sans-serif !important;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="border-collapse: collapse; width: 100%"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              direction: ltr;
                              font-size: 0px;
                              padding: 16px 0px;
                              text-align: center;
                              font-family: system-ui, -apple-system,
                                BlinkMacSystemFont, 'Segoe UI', 'Axiforma',
                                Helvetica, Arial, sans-serif !important;
                            "
                            align="center"
                          >
                            <div
                              class="m_-5524253599865228502mj-column-per-100 m_-5524253599865228502workspace_box"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', 'Axiforma',
                                  Helvetica, Arial, sans-serif !important;
                                border-radius: 10px !important;
                                border: 1px solid #e4e4e4 !important;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                                style="border-collapse: collapse"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        border-collapse: collapse;
                                        border-radius: 10px;
                                        vertical-align: top;
                                        padding: 20px;
                                        font-family: system-ui, -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          'Axiforma', Helvetica, Arial,
                                          sans-serif !important;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="border-collapse: collapse"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="m_-5524253599865228502text_1"
                                              style="
                                                border-collapse: collapse;
                                                font-size: 0px;
                                                padding: 0px;
                                                word-break: break-word;
                                                font-family: system-ui,
                                                  -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  'Axiforma', Helvetica, Arial,
                                                  sans-serif !important;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-size: 16px;
                                                  font-weight: 500;
                                                  line-height: 24px;
                                                  text-align: left;
                                                  color: #202020;
                                                  font-family: system-ui,
                                                    -apple-system,
                                                    BlinkMacSystemFont,
                                                    'Segoe UI', 'Axiforma',
                                                    Helvetica, Arial, sans-serif !important;
                                                "
                                              >
                                                ${workspaceName}
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    style="
                      margin: 0px auto;
                      max-width: 400px;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', 'Axiforma', Helvetica, Arial, sans-serif !important;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="border-collapse: collapse; width: 100%"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              direction: ltr;
                              font-size: 0px;
                              padding: 0px;
                              text-align: center;
                              font-family: system-ui, -apple-system,
                                BlinkMacSystemFont, 'Segoe UI', 'Axiforma',
                                Helvetica, Arial, sans-serif !important;
                            "
                            align="center"
                          >
                            <div
                              class="m_-5524253599865228502mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', 'Axiforma',
                                  Helvetica, Arial, sans-serif !important;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                                style="border-collapse: collapse"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        border-collapse: collapse;
                                        vertical-align: top;
                                        padding: 0px;
                                        font-family: system-ui, -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          'Axiforma', Helvetica, Arial,
                                          sans-serif !important;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="border-collapse: collapse"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="m_-5524253599865228502btn_1"
                                              style="
                                                border-collapse: collapse;
                                                font-size: 0px;
                                                padding: 0px;
                                                word-break: break-word;
                                                font-family: system-ui,
                                                  -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  'Axiforma', Helvetica, Arial,
                                                  sans-serif !important;
                                              "
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  border-collapse: separate;
                                                  width: 100%;
                                                  line-height: 100%;
                                                "
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      bgcolor="#6E56CF"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        border: none;
                                                        border-radius: 8px;
                                                        background: #6e56cf;
                                                        font-family: system-ui,
                                                          -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', 'Axiforma',
                                                          Helvetica, Arial,
                                                          sans-serif !important;
                                                      "
                                                      valign="middle"
                                                    >
                                                      <a
                                                        href=${acceptLink}
                                                        style="
                                                          background: #6e56cf;
                                                          color: #ffffff;
                                                          font-size: 14px;
                                                          font-weight: 500;
                                                          line-height: 16px;
                                                          letter-spacing: -0.15px;
                                                          margin: 0;
                                                          text-decoration: none;
                                                          text-transform: none;
                                                          padding: 12px;
                                                          border-radius: 8px;
                                                          font-family: system-ui,
                                                            -apple-system,
                                                            BlinkMacSystemFont,
                                                            'Segoe UI',
                                                            'Axiforma',
                                                            Helvetica, Arial,
                                                            sans-serif !important;
                                                          display: block !important;
                                                        "
                                                        target="_blank"
                                                        >Accept Invite</a
                                                      >
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                border-collapse: collapse;
                                                font-size: 0px;
                                                padding: 0px;
                                                padding-top: 12px;
                                                word-break: break-word;
                                                font-family: system-ui,
                                                  -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  'Axiforma', Helvetica, Arial,
                                                  sans-serif !important;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  letter-spacing: -0.15px;
                                                  line-height: 18px;
                                                  text-align: center;
                                                  color: #646464;
                                                  font-family: system-ui,
                                                    -apple-system,
                                                    BlinkMacSystemFont,
                                                    'Segoe UI', 'Axiforma',
                                                    Helvetica, Arial, sans-serif !important;
                                                "
                                              >
                                                <a
                                                  style="
                                                    color: #646464;
                                                    text-decoration: none;
                                                    font-family: system-ui,
                                                      -apple-system,
                                                      BlinkMacSystemFont,
                                                      'Segoe UI', 'Axiforma',
                                                      Helvetica, Arial,
                                                      sans-serif !important;
                                                  "
                                                  href=${declineLink}
                                                  target="_blank"
                                                  >decline</a
                                                >
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
};
