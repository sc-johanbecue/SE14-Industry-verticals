# Generates Bupa corporate slice templates under templatesProject/bupa,
# corporate Data sample folders/items, and updates Json Rendering datasource metadata.
# Run from repo: pwsh -File tools/Generate-BupaCorporateSitecoreArtifacts.ps1

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path

$tplRoot = Join-Path $repoRoot 'authoring/items/bupa/templatesProject/bupa'
$dataRoot = Join-Path $repoRoot 'authoring/items/bupa/corporate-site/bupa-corporate/Data'
$rendRoot = Join-Path $repoRoot 'authoring/items/bupa/projectRenderings/bupa'

$templatesParent = 'c1510e5c-55a0-4ce8-8346-d4bd6cefe965'
$corpDataId = 'd11240a8-6656-4899-925d-ca0a34254233'
$corpHomeUpper = '3ACC9B51-6A8A-423B-98D1-E3071967C7A4'

$templateFolderTemplate = '0437fee2-44c9-46a6-abe9-28858d9fee8c'
$branchTemplateId = 'ab86861a-6030-46c5-b394-e8f99e8b87db'
$templateFieldTemplate = '455a3e98-a627-4b40-8035-e683a0331ac7'
$dataSectionTemplate = 'e269fbb5-3750-427a-9149-7aa950b49301'
$baseStandard = '1930BBEB-7805-471A-A3BE-4858AC7CF696'
$basePerSite = '44A022DB-56D3-419A-B43B-E27E4D8E9C41'
$standardMasters = '{39F4CCB1-1C4E-4111-891D-5306FF486461}'
$renderingParamBase = '{E269FBB5-3750-427A-9149-7AA950B49301}'
$paramYamlBlock = @"
    {4247AAD4-EBDE-4994-998F-E067A51B1FE4}
    {5C74E985-E055-43FF-B28C-DB6C6A6450A2}
    {3DB3EB10-F8D0-4CC9-BE26-18CE7B139EC8}
"@

$bupaHeroVideoFolderTpl = 'bc72dcc9-0001-400d-8010-010000000010'
$bupaHeroVideoTpl = 'bc72dcc9-0001-400d-8010-010000000002'

function New-DirectoryForce([string]$p) {
  if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null }
}

function Write-Utf8NoBom([string]$path, [string]$content) {
  New-DirectoryForce (Split-Path $path -Parent)
  [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
}

function Common-EnFields([string]$rev) {
  return @"
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260506T120000Z
    - ID: "52807595-0f8f-4b20-8d2a-cb71d28c6103"
      Hint: __Owner
      Value: |
        sitecore\johan.becue@sitecore.com
    - ID: "5dd74568-4d4b-44c1-b513-0af5f4cda34f"
      Hint: __Created by
      Value: |
        sitecore\johan.becue@sitecore.com
    - ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"
      Hint: __Revision
      Value: "$rev"
    - ID: "badd9cf9-53e0-4d0c-bcc0-2d784c282f6a"
      Hint: __Updated by
      Value: |
        sitecore\johan.becue@sitecore.com
    - ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"
      Hint: __Updated
      Value: 20260506T120000Z
"@
}

function Emit-TemplateSection {
  param(
    [string]$PathSeg,
    [string]$SectionId,
    [string]$MainId,
    [string]$FolderId,
    [string]$DataSecId,
    [string]$StdId,
    [string]$FolderStdId,
    [string]$ParamId,
    [string]$RParamId,
    [string]$ParamStdId,
    [object[]]$FieldDefs
  )

  $basePath = Join-Path $tplRoot $PathSeg
  New-DirectoryForce $basePath

  $folderYmlPath = Join-Path $tplRoot "$PathSeg.yml"
  Write-Utf8NoBom $folderYmlPath @"
---
ID: "$SectionId"
Parent: "$templatesParent"
Template: "$templateFolderTemplate"
Path: /sitecore/templates/Project/bupa/$PathSeg
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $SectionId)

"@

  Write-Utf8NoBom (Join-Path $basePath "$PathSeg.yml") @"
---
ID: "$MainId"
Parent: "$SectionId"
Template: "$branchTemplateId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$PathSeg
SharedFields:
- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"
  Hint: __Masters
  Value: "$standardMasters"
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
    {$baseStandard}
    {$basePerSite}
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$MainId"
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{$StdId}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $MainId)

"@

  Write-Utf8NoBom (Join-Path $basePath "$PathSeg/Data.yml") @"
---
ID: "$DataSecId"
Parent: "$MainId"
Template: "$dataSectionTemplate"
Path: /sitecore/templates/Project/bupa/$PathSeg/$PathSeg/Data
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $DataSecId)

"@

  foreach ($fd in $FieldDefs) {
    $blob = New-Object System.Collections.Generic.List[string]
    if ($fd.Source) {
      $blob.Add(@"
- ID: "1eb8ae32-e190-44a6-968d-ed904c794ebf"
  Hint: Source
  Value: "$($fd.Source)"
"@)
    }
    $blob.Add(@"
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "$($fd.Type)"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: $($fd.Sort)
"@)
    if ($fd.Shared -eq 1) {
      $blob.Add(@"
- ID: "be351a73-fcb0-4213-93fa-c302d8ab4f51"
  Hint: Shared
  Value: 1
"@)
    }
    $blob.Add(@"
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$($fd.FieldId)"
"@)
    $sharedBlock = $blob -join "`n"

    Write-Utf8NoBom (Join-Path $basePath "$PathSeg/Data/$($fd.Name).yml") @"
---
ID: "$($fd.FieldId)"
Parent: "$DataSecId"
Template: "$templateFieldTemplate"
Path: /sitecore/templates/Project/bupa/$PathSeg/$PathSeg/Data/$($fd.Name)
SharedFields:
$sharedBlock
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $fd.FieldId)

"@
  }

  $folderName = "$PathSeg Folder"
  Write-Utf8NoBom (Join-Path $basePath "$folderName.yml") @"
---
ID: "$FolderId"
Parent: "$SectionId"
Template: "$branchTemplateId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$folderName
SharedFields:
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 260
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$FolderId"
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{$FolderStdId}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $FolderId)

"@

  Write-Utf8NoBom (Join-Path $basePath "$folderName/__Standard Values.yml") @"
---
ID: "$FolderStdId"
Parent: "$FolderId"
Template: "$FolderId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$folderName/__Standard Values
SharedFields:
- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"
  Hint: __Masters
  Value: |
    {$MainId}
    {$FolderId}
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$FolderStdId"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $FolderStdId)

"@

  Write-Utf8NoBom (Join-Path $basePath "$PathSeg/__Standard Values.yml") @"
---
ID: "$StdId"
Parent: "$MainId"
Template: "$MainId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$PathSeg/__Standard Values
SharedFields:
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$StdId"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $StdId)

"@

  $paramsName = "$PathSeg Parameters"
  Write-Utf8NoBom (Join-Path $basePath "$paramsName.yml") @"
---
ID: "$ParamId"
Parent: "$SectionId"
Template: "$branchTemplateId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$paramsName
SharedFields:
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
$paramYamlBlock
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$ParamStdId"
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{$ParamStdId}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $ParamId)

"@

  New-DirectoryForce (Join-Path $basePath $paramsName)
  Write-Utf8NoBom (Join-Path $basePath "$paramsName/Rendering Parameters.yml") @"
---
ID: "$RParamId"
Parent: "$ParamId"
Template: "$branchTemplateId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$paramsName/Rendering Parameters
SharedFields:
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: "$renderingParamBase"
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$RParamId"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $RParamId)

"@

  Write-Utf8NoBom (Join-Path $basePath "$paramsName/__Standard Values.yml") @"
---
ID: "$ParamStdId"
Parent: "$ParamId"
Template: "$ParamId"
Path: /sitecore/templates/Project/bupa/$PathSeg/$paramsName/__Standard Values
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $ParamStdId)

"@
}

function Link-ToHome([string]$text) {
  return '<link text="' + $text + '" anchor="" linktype="internal" class="" title="" target="" querystring="" id="{' + $corpHomeUpper + '}" />'
}

$cSpec = @(
  @{ Key = 'BupaCorporatePromoBand'; P = 'bc72dcc1'; RF = 'BupaCorporatePromoBand.yml'; DFS = 'BupaCorporatePromoBands'; SN = 'Default BupaCorporatePromoBand'
     V = @{ Title = 'blua.'; Tagline = 'Digital health by Bupa' }; S = @{ Cta = (Link-ToHome 'Learn more about Blua') }
     F = @(
       @{ Name = 'Title'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'Tagline'; Type = 'Single-Line Text'; Sort = 500 }
       @{ Name = 'Cta'; Type = 'General Link'; Sort = 700; Shared = 1; Source = 'query:$linkableHomes' }
     ) }
  @{ Key = 'BupaCorporateCard'; P = 'bc72dcc2'; RF = 'Corporate/BupaCorporateCard.yml'; DFS = 'BupaCorporateCards'; SN = 'Default BupaCorporateCard'
     V = @{
       Heading = 'Bupa Group Annual Report and Accounts 2025'
       Body = '<p>We have published our 2025 Annual Report and Accounts.</p>'
       HeaderLayout = 'collage'
     }
     S = @{ Cta = (Link-ToHome 'Download the report') }
     F = @(
       @{ Name = 'Heading'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'Body'; Type = 'Rich Text'; Sort = 500; Source = 'query:$xaRichTextProfile' }
       @{ Name = 'Cta'; Type = 'General Link'; Sort = 600; Shared = 1; Source = 'query:$linkableHomes' }
       @{ Name = 'Image'; Type = 'Image'; Sort = 700; Shared = 1; Source = 'query:$siteMedia' }
       @{ Name = 'HeaderLayout'; Type = 'Single-Line Text'; Sort = 350 }
       @{ Name = 'CollageLeft'; Type = 'Image'; Sort = 360; Shared = 1; Source = 'query:$siteMedia' }
       @{ Name = 'CollageCenter'; Type = 'Image'; Sort = 370; Shared = 1; Source = 'query:$siteMedia' }
       @{ Name = 'CollageRight'; Type = 'Image'; Sort = 380; Shared = 1; Source = 'query:$siteMedia' }
       @{ Name = 'SolidHeaderTitle'; Type = 'Single-Line Text'; Sort = 390 }
     ) }
  @{ Key = 'BupaCorporateStatsSection'; P = 'bc72dcc3'; RF = 'BupaCorporateStatsSection.yml'; DFS = 'BupaCorporateStatsSections'; SN = 'Default BupaCorporateStatsSection'
     V = @{
       Eyebrow = 'Creating a'; Title = 'Better World'
       Body = '<p>We are committed to improving global health while caring for our planet.</p>'
       Stat1Value = '2040'; Stat1Description = 'Our Net Zero target for a healthy future.'
       Stat2Value = '500'; Stat2Description = 'Innovation start-ups engaged by 2025.'
       Stat3Value = '1m'; Stat3Description = 'People supported by 2025.'
     }; S = @{ Cta = (Link-ToHome 'View our strategy') }
     F = @(
       @{ Name = 'Eyebrow'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'Title'; Type = 'Single-Line Text'; Sort = 500 }
       @{ Name = 'Body'; Type = 'Rich Text'; Sort = 600; Source = 'query:$xaRichTextProfile' }
       @{ Name = 'Cta'; Type = 'General Link'; Sort = 700; Shared = 1; Source = 'query:$linkableHomes' }
       @{ Name = 'BackgroundImage'; Type = 'Image'; Sort = 800; Shared = 1; Source = 'query:$siteMedia' }
       @{ Name = 'Stat1Value'; Type = 'Single-Line Text'; Sort = 900 }
       @{ Name = 'Stat1Description'; Type = 'Single-Line Text'; Sort = 1000 }
       @{ Name = 'Stat2Value'; Type = 'Single-Line Text'; Sort = 1100 }
       @{ Name = 'Stat2Description'; Type = 'Single-Line Text'; Sort = 1200 }
       @{ Name = 'Stat3Value'; Type = 'Single-Line Text'; Sort = 1300 }
       @{ Name = 'Stat3Description'; Type = 'Single-Line Text'; Sort = 1400 }
     ) }
  @{ Key = 'BupaCorporateHorizontalFeature'; P = 'bc72dcc4'; RF = 'BupaCorporateHorizontalFeature.yml'; DFS = 'BupaCorporateHorizontalFeatures'; SN = 'Default BupaCorporateHorizontalFeature'
     V = @{ Heading = 'Bupa Group Annual Report and Accounts 2023'; Body = '<p>Our performance, governance, and outlook.</p>' }
     S = @{ Cta = (Link-ToHome 'Read the full report') }
     F = @(
       @{ Name = 'Heading'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'Body'; Type = 'Rich Text'; Sort = 500; Source = 'query:$xaRichTextProfile' }
       @{ Name = 'Cta'; Type = 'General Link'; Sort = 600; Shared = 1; Source = 'query:$linkableHomes' }
       @{ Name = 'Image'; Type = 'Image'; Sort = 700; Shared = 1; Source = 'query:$siteMedia' }
     ) }
  @{ Key = 'BupaCorporateFinancialStrip'; P = 'bc72dcc5'; RF = 'BupaCorporateFinancialStrip.yml'; DFS = 'BupaCorporateFinancialStrips'; SN = 'Default BupaCorporateFinancialStrip'
     V = @{ LeftTitle = 'Financial update'; Heading = 'Bupa Group full year results for 2023'; Body = '<p>Summary of our annual performance.</p>' }
     S = @{ Cta = (Link-ToHome 'Read the full announcement') }
     F = @(
       @{ Name = 'LeftTitle'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'Heading'; Type = 'Single-Line Text'; Sort = 500 }
       @{ Name = 'Body'; Type = 'Rich Text'; Sort = 600; Source = 'query:$xaRichTextProfile' }
       @{ Name = 'Cta'; Type = 'General Link'; Sort = 700; Shared = 1; Source = 'query:$linkableHomes' }
     ) }
  @{ Key = 'BupaCorporateThinkingSection'; P = 'bc72dcc6'; RF = 'BupaCorporateThinkingSection.yml'; DFS = 'BupaCorporateThinkingSections'; SN = 'Default BupaCorporateThinkingSection'
     V = @{ TitlePrefix = 'Our latest'; TitleHighlight = 'Thinking' }; S = @{}
     F = @(
       @{ Name = 'TitlePrefix'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'TitleHighlight'; Type = 'Single-Line Text'; Sort = 500 }
     ) }
  @{ Key = 'BupaCorporateThinkingCard'; P = 'bc72dcc7'; RF = 'BupaCorporateThinkingCard.yml'; DFS = 'BupaCorporateThinkingCards'; SN = 'Default BupaCorporateThinkingCard'
     V = @{ Eyebrow = 'Press release'; Title = 'Bupa announces sponsorship of Women of the Future: 50 Rising Stars in ESG.' }
     S = @{ Cta = (Link-ToHome 'Read the press release') }
     F = @(
       @{ Name = 'Eyebrow'; Type = 'Single-Line Text'; Sort = 400 }
       @{ Name = 'Title'; Type = 'Single-Line Text'; Sort = 500 }
       @{ Name = 'Body'; Type = 'Rich Text'; Sort = 600; Source = 'query:$xaRichTextProfile' }
       @{ Name = 'Cta'; Type = 'General Link'; Sort = 700; Shared = 1; Source = 'query:$linkableHomes' }
       @{ Name = 'Image'; Type = 'Image'; Sort = 800; Shared = 1; Source = 'query:$siteMedia' }
     ) }
)

# After running, execute: dotnet sitecore serialization validate --fix --include Project (from authoring/platform)
$seqSlice = [uint64]450

foreach ($c in $cSpec) {
  $p = $c.P
  # Infra GUIDs (__std, Folder, Params) must stay in 009-014 band; datasource fields begin at suffix ...020+
  $sid = "$p-0001-400d-8010-010000000001"
  $mid = "$p-0001-400d-8010-010000000002"
  $did = "$p-0001-400d-8010-010000000003"
  $fldId = "$p-0001-400d-8010-010000000010"
  $stdId = "$p-0001-400d-8010-010000000009"
  $fstd = "$p-0001-400d-8010-010000000011"
  $prm = "$p-0001-400d-8010-010000000012"
  $rprm = "$p-0001-400d-8010-010000000013"
  $prmStd = "$p-0001-400d-8010-010000000014"

  $ni = 20
  [System.Collections.ArrayList]$fieldList = @()
  foreach ($f in $c.F) {
    $suffix = '010000000{0:D3}' -f $ni
    $fid = '{0}-0001-400d-8010-{1}' -f $p, $suffix
    $ni++
    $fieldList.Add([ordered]@{ Name = $f.Name; FieldId = $fid; Type = $f.Type; Sort = $f.Sort; Shared = $f.Shared; Source = $f.Source }) | Out-Null
  }

  Emit-TemplateSection $c.Key $sid $mid $fldId $did $stdId $fstd $prm $rprm $prmStd ([array]$fieldList)

  $nameToFieldId = @{}
  foreach ($x in $fieldList) { $nameToFieldId[$x.Name] = $x.FieldId }

  $vv = New-Object System.Collections.Generic.List[string]
  foreach ($key in $c.V.Keys) {
    $val = $c.V[$key]
    if ($val -eq $null -or $val -eq '') { continue }
    $fidR = $nameToFieldId[$key]
    if (-not $fidR) { continue }
    $vv.Add(@"
    - ID: "$fidR"
      Hint: $key
      Value: $val
"@)
  }

  $ss = @()
  foreach ($key in $c.S.Keys) {
    $fidR = $nameToFieldId[$key]
    if (-not $fidR) { continue }
    $ss += @"

- ID: "$fidR"
  Hint: $key
  Value: |
    $($c.S[$key].TrimEnd())
"@
  }

  $stdYaml = @"
---
ID: "$stdId"
Parent: "$mid"
Template: "$mid"
Path: /sitecore/templates/Project/bupa/$($c.Key)/$($c.Key)/__Standard Values
SharedFields:
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$stdId"$($ss -join '')
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(if ($vv.Count) { ($vv -join "`n") + "`n" })$(Common-EnFields $stdId)

"@
  Write-Utf8NoBom (Join-Path $tplRoot "$($c.Key)/$($c.Key)/__Standard Values.yml") $stdYaml

  # Valid RFC-style GUID suffix (avoid string concat that breaks hyphen groups)
  $dfId = "bc728fe9-1101-4ee2-b770-$('{0:X12}' -f $seqSlice)"
  $seqSlice++
  $diId = "bc728fe9-1101-4ee2-b770-$('{0:X12}' -f $seqSlice)"
  $seqSlice++

  Write-Utf8NoBom (Join-Path $dataRoot "$($c.DFS).yml") @"
---
ID: "$dfId"
Parent: "$corpDataId"
Template: "$fldId"
Path: "/sitecore/content/bupa/bupa-corporate/Data/$($c.DFS)"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $dfId)

"@

  $sbShared = New-Object System.Collections.Generic.List[string]
  foreach ($fl in [array]$fieldList) {
    if ($fl.Shared -eq 1 -and $fl.Type -eq 'General Link') {
      $txt = $c.S[$fl.Name]
      if ($txt) {
        $sbShared.Add(@"
- ID: "$($fl.FieldId)"
  Hint: $($fl.Name)
  Value: |
    $($txt.TrimEnd())
"@)
      }
    }
  }
  $mastersShared = '- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "' + $diId + '"' + "`n"
  $blobSh = ''
  if ($sbShared.Count) {
    $blobSh = "SharedFields:`n"
    foreach ($ln in $sbShared) { $blobSh += $ln + "`n" }
    $blobSh += $mastersShared + "`n"
  }
  else {
    $blobSh = "SharedFields:`n" + $mastersShared + "`n"
  }

  $vf = New-Object System.Collections.Generic.List[string]
  foreach ($fl in [array]$fieldList) {
    if ($fl.Shared -eq 1) { continue }
    if (-not ($c.V.ContainsKey($fl.Name))) { continue }
    $v = $c.V[$fl.Name]
    if ($v -eq $null -or $v -eq '') { continue }
    $vf.Add(@"
    - ID: "$($fl.FieldId)"
      Hint: $($fl.Name)
      Value: $v
"@)
  }

  New-DirectoryForce (Join-Path $dataRoot $c.DFS)

  $sampleBody = @"
---
ID: "$diId"
Parent: "$dfId"
Template: "$mid"
Path: "/sitecore/content/bupa/bupa-corporate/Data/$($c.DFS)/$($c.SN)"
$blobSh
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(if ($vf.Count) { (($vf.ToArray()) -join "`n") + "`n" } else { '' })$(Common-EnFields $diId)

"@
  Write-Utf8NoBom (Join-Path $dataRoot "$($c.DFS)/$($c.SN).yml") ($sampleBody -replace "`r`n", "`n")

  # Rendering metadata (Json Rendering)
  $rf = Join-Path $rendRoot $c.RF
  $dsl = ('query:$site/*[@@name=''Data'']/*[@@templatename=''{0} Folder'']|query:$sharedSites/_[@@name=''Data'']/_[@@templatename=''{0} Folder'']' -f $c.Key)
  $dsPath = "/sitecore/templates/Project/bupa/$($c.Key)/$($c.Key)"
  $t = Get-Content $rf -Raw
  if ($t -notmatch 'Hint: Datasource Template') {
    $inj = @"
- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"
  Hint: Datasource Template
  Value: $dsPath
- ID: "b5b27af1-25ef-405c-87ce-369b3a004016"
  Hint: Datasource Location
  Value: "$dsl"

"@
    $t = $t -replace '(\r?\n)(- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d")', "`$1$inj`$2"
  }
  $t = [regex]::Replace(
    $t,
    '- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d"\s*\r?\n\s*Hint: Parameters Template\s*\r?\n\s*Value: "[^"]*"',
    @"
- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d"
  Hint: Parameters Template
  Value: "{$prm}"
"@,
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
  Write-Utf8NoBom $rf $t.TrimEnd()
}

$contentIds = @{
  HeroVideosFolder = 'bc728fe9-1101-4ee2-b770-0000000001E0'
  HeroVideoDefault = 'bc728fe9-1101-4ee2-b770-0000000001E1'
  FootersFolder    = 'bc72eed0-0001-400e-80e0-000000000020'
  FooterDefault    = 'bc72eed0-0001-400e-80e0-000000000021'
}

New-DirectoryForce (Join-Path $dataRoot 'BupaCorporateHeroVideos')
Write-Utf8NoBom (Join-Path $dataRoot 'BupaCorporateHeroVideos.yml') @"
---
ID: "$($contentIds.HeroVideosFolder)"
Parent: "$corpDataId"
Template: "$bupaHeroVideoFolderTpl"
Path: "/sitecore/content/bupa/bupa-corporate/Data/BupaCorporateHeroVideos"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $contentIds.HeroVideosFolder)

"@

Write-Utf8NoBom (Join-Path $dataRoot 'BupaCorporateHeroVideos/Default BupaCorporateHeroVideo.yml') @"
---
ID: "$($contentIds.HeroVideoDefault)"
Parent: "$($contentIds.HeroVideosFolder)"
Template: "$bupaHeroVideoTpl"
Path: "/sitecore/content/bupa/bupa-corporate/Data/BupaCorporateHeroVideos/Default BupaCorporateHeroVideo"
SharedFields:
- ID: "bc72dcc9-0001-400d-8010-010000000020"
  Hint: VideoUrl
  Value: |
    <link text="" linktype="external" url="https://vimeo.com/981226524" anchor="" title="" class="" target="" />
- ID: "bc72dcc9-0001-400d-8010-010000000021"
  Hint: Cta
  Value: |
    $(Link-ToHome 'Learn about Blua')
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "$($contentIds.HeroVideoDefault)"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $contentIds.HeroVideoDefault)

"@

$bupaFooterFolder = 'bffaa001-0001-4ff1-aff1-a00100000030'
$bupaFooterTpl = 'bffaa001-0001-4ff1-aff1-a00100000010'
Write-Utf8NoBom (Join-Path $dataRoot 'Footers.yml') @"
---
ID: "$($contentIds.FootersFolder)"
Parent: "$corpDataId"
Template: "$bupaFooterFolder"
Path: "/sitecore/content/bupa/bupa-corporate/Data/Footers"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
$(Common-EnFields $contentIds.FootersFolder)

"@

$footerUkPath = Join-Path $repoRoot 'authoring/items/bupa/site/bupa-uk/Data/Footers/Deafult footer.yml'
$fu = Get-Content $footerUkPath -Raw
$fu = $fu -replace 'dffaa001-0001-4ff1-d001-000000000002', $contentIds.FooterDefault `
  -replace 'dffaa001-0001-4ff1-d001-000000000001', $contentIds.FootersFolder `
  -replace '"/sitecore/content/bupa/bupa-uk/Data/Footers/Deafult footer"', '"/sitecore/content/bupa/bupa-corporate/Data/Footers/Default corporate footer"' `
  -replace '/sitecore/content/bupa/bupa-uk/Data/Footers/Deafult footer', '/sitecore/content/bupa/bupa-corporate/Data/Footers/Default corporate footer' `
  -replace '\{C62DE7CE-DFE4-464C-8958-C9B7C6735399\}', "{$corpHomeUpper}"
New-DirectoryForce (Join-Path $dataRoot 'Footers')
Write-Utf8NoBom (Join-Path $dataRoot 'Footers/Default corporate footer.yml') $fu

Write-Host 'Bupa Corporate Sitecore templates, Data samples, renderings OK.'

