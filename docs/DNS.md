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
