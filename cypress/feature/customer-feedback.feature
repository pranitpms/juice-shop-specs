@regression
Feature: Customer Feedback Page

    Background: Navigate to Customer Feedback Page
        Given User visit the application
        Then Verify user is landed on Home Page
        When User click on drawer icon
        And Navigate to "Customer Feedback" Page
        Then verify that "Customer Feedback" Page is Loaded

    Scenario Outline:  Provide a valid Customer feddback for Different languages.
        Given User change the language to <language>
        Given User added a comment of 160 character length
        And User gave 5 stars rating
        And User type captcha result
        And User submit the feedback
        Then verify the customer feedback is submitted successfully

        Examples:
            | language |
            | English  |
            | Deutsch  |
            | हिंदी    |
            | 中文     |
            | الحساب   |

    Scenario Outline: Field validations on Customer Feedback form
        Given User change the language to <language>
        Then Verify form controls initial state
        When User added a no comment
        Then Comment field should show validation message
        When User give no captcha value
        Then Captcha field should show mandatory validation message
        When User give captcha value as 'abcd'
        Then Captcha field should show validation message

        Examples:
            | language |
            | English  |
            | Deutsch  |

    Scenario: Invalid captcha validation on form submit
        Given User added a comment of 50 character length
        And User gave 3 stars rating
        And User give wrong captcha value
        And User submit the feedback
        Then verify the result for Invalid captcha

    Scenario: User should not able to submit feedback if comment is not given
        Given User gave 2 stars rating
        And User type captcha result
        Then verify submit button is not enabled

    Scenario: User should not able to submit feedback if rating is not given
        Given User added a comment of 10 character length
        And User type captcha result
        Then verify submit button is not enabled

    Scenario: User should not able to submit feedback if captcha is not given
        Given User added a comment of 24 character length
        And User gave 5 stars rating
        Then verify submit button is not enabled
