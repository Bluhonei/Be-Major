# be-major.com DNS (Squarespace Domains)

Snapshot taken Oct 22, 2026, before any changes. This is the rollback copy.

## Website (Squarespace Defaults preset)
| Type | Name | Data | TTL |
|---|---|---|---|
| A | @ | 198.49.23.145 | 4 hrs |
| CNAME | www | ext-sq.squarespace.com | 4 hrs |

**Rollback for the website switch:** restore exactly these two records, or re-add the "Squarespace Defaults" preset.

## Squarespace Domain Connect (leave as is)
| Type | Name | Data | TTL |
|---|---|---|---|
| CNAME | _domainconnect | _domainconnect.domains.squarespace.com | 1 hr |

## Email: Google Workspace preset (already present)
| Type | Name | Priority | Data | TTL |
|---|---|---|---|---|
| MX | @ | 1 | aspmx.l.google.com | 4 hrs |
| MX | @ | 5 | alt1.aspmx.l.google.com | 4 hrs |
| MX | @ | 5 | alt2.aspmx.l.google.com | 4 hrs |
| MX | @ | 10 | alt3.aspmx.l.google.com | 4 hrs |
| MX | @ | 10 | alt4.aspmx.l.google.com | 4 hrs |
| TXT | @ | — | google-site-verification=R91rjEk5kw7xpWeupaz… (truncated in screenshot) | 4 hrs |

**Never touch these during the website switch.**

## Not yet present
- SPF (`TXT @ v=spf1 …`)
- DKIM (`TXT google._domainkey …` from Google Admin)
- DMARC (`TXT _dmarc …`)
- Flodesk domain authentication records

## Website switch to Vercel (records from Vercel → be-major → Domains)
Primary domain: **be-major.com** (Production). www.be-major.com: 308 redirect to be-major.com.

1. Delete the Squarespace Defaults preset (A @ 198.49.23.145, CNAME www ext-sq.squarespace.com).
2. Add custom records:

| Type | Name | Data |
|---|---|---|
| A | @ | 216.150.1.1 |
| CNAME | www | cc7202c30c64719e.vercel-dns-016.com |

Vercel's legacy values (76.76.21.21 / cname.vercel-dns.com) also work, but the values above are the ones Vercel recommends for this project.

3. Leave all Google records, the `76781023` CNAME (Google account-recovery check) and `_domainconnect` untouched.
4. Once both domains show Valid Configuration in Vercel, merge the launch switch (`LAUNCHED = true`).

## Temporary
| Type | Name | Data | Why |
|---|---|---|---|
| CNAME | 76781023 | google.com | Google Workspace admin recovery for hello@be-major.com (case 76781023). Delete after the review closes. |
