---
title: flutter 运行程序报错处理
date: 2023/03/24
tags:
 - 运行程序报错
categories:
 - flutter
---

## Unsupported operation: Unsupport download API in browser

- 

```dart
 Column(
          children: [
            RichText(
              text: TextSpan(children: [
                TextSpan(
                  style: new TextStyle(color: Colors.black),
                  text: "seeSourceFirst",
                ),
                TextSpan(
                  text: "seeSourceFirst",
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
              ]),
            ),
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    style: new TextStyle(color: Colors.black),
                    text: "seeSourceFirst",
                  ),
                  TextSpan(
                    style: new TextStyle(color: Colors.blueAccent),
                    text: "repoText",
                    recognizer: TapGestureRecognizer()
                      ..onTap = () async {
                        final url = 'https://github.com/flutter/gallery/';
                        if (await canLaunch(url)) {
                          await launch(
                            url,
                            forceSafariVC: false,
                          );
                        }
                      },
                  ),
                  TextSpan(
                    text: "seeSourceSecond",
                  ),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              child: LinearProgressIndicator(value: _progress),
            ),
          ],
```
