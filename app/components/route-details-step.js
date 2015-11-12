import Ember from 'ember';

export default Ember.Component.extend({
    stepIcon: Ember.computed(function() {
        var stepIcon;
        
        switch(this.get('step.maneuver')) {
            case 'turn-left':
            case 'turn-slight-left':
            case 'turn-sharp-left':
            case 'ramp-left':
            case 'fork-left':
                stepIcon = '<svg viewBox="0 0 17 17" height="17" width="17" preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><image height="17" width="17" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAkFBMVEUAAADBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcEAAAAmyC4HAAAALnRSTlMAD40dOed38WtoaWVHBEHB4nGOrlfw++ruoBm6/AkHCzQ7idW1Khdu6V9m7W/cTlGkegAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAB7SURBVBjTrY7JEoJADETHBZVNRWVkHdwQdKD///PMMFUU8cy7JHmHdAtBLJYrwVg74GIDbHeu5/lBONz7A0aOkTEnTDkbdYkBeSUSo1KjshxFqZSqbjmp+/DrIZUNeQIvu9VvOxug5UU+VIQbH0i4+QJ6DtNRxb90rfsfixgQcBfAWdcAAAAASUVORK5CYII="/></svg>';
            break;
            
            case 'uturn-left':
            case 'roundabout-left':
                stepIcon = '<svg viewBox="0 0 16 16" height="16" width="16" preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><image height="16" width="16" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAtFBMVEUAAADBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcEAAAC71Fm3AAAAOnRSTlMAU63h6cd/EQay7E3PR5SXT0Zx3vwdXgqJbtBf15CaNPCbN++MnTrte4561oMBWmh1hsPRDxs/fDbcTGDRjwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAACOSURBVBjTVY9XFsIwDARD7y30ToAQeq9z/4MhR84j7M96x1492XFCJZKpdCabc6zyBUIVSxaUiVQJc1VOtXrDbULLtNqSO+aiK6Qn3oeBVocwEhvDRMEUZgo8BXNYiC3BV7CCQGwNmxjY+rLFztsfInDUjU6/ytnkS3zGFW5/Q+/wUPCUt8bdl/3kOwg+X3FgGTB9xl3VAAAAAElFTkSuQmCC"/></svg>';
            break;
            
            case 'turn-right':
            case 'turn-slight-right':
            case 'turn-sharp-right':
            case 'ramp-right':
            case 'fork-right':
                stepIcon = '<svg viewBox="0 0 17 17" height="17" width="17" preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><image height="17" width="17" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAmVBMVEUAAADBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcEAAADPIn0QAAAAMXRSTlMAGI8V7D8CRWVpaOt+a9/GppeV7ur79V4yvzgLBwPzwB+q3fiQ5nkULPFn7W1ud9tmo6iroQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAB6SURBVBjTrY5HEsJADAQFGIxNzmlNzkvq/38OwdoulrP7MlJXqTQiOaVyRf4gqGZjLaxHURw3oOlEq01OJ1TR5ZeeSP+Tg6EygvFEZKr7bL4wxiRLVmu92cA2fbDbf+MARydOZ5cXuPq1LNx8E8C9CKMFH755WvvyxBsMgBCbAeaCbwAAAABJRU5ErkJggg=="/></svg>';
            break;
            
            case 'uturn-right':
            case 'roundabout-right':
                stepIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="9" height="19" viewBox="0 0 9 19"><image xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAATCAMAAAB1AtffAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAV1BMVEUAAADBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcEAAABo0ptvAAAAG3RSTlMAjgh3Hi3Q34tKWn+xwMWvLkBFVUdXTV5D8lKJRErvAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAEtJREFUCNety0kSgDAIRNGO8xwTR+T+97SFK/g3vIICYKGAV2pwVKpamxqq9dtXB/TqDRinmXOJXGKlkn1kajPt1PGjTuoy3SLyAC/otwiKgTl6jAAAAABJRU5ErkJggg==" width="9" height="19"/></svg>';
            break;
            
            default:
                stepIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="9" height="19" viewBox="0 0 9 19"><image xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAATCAMAAAB1AtffAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAV1BMVEUAAADBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcEAAABo0ptvAAAAG3RSTlMAjgh3Hi3Q34tKWn+xwMWvLkBFVUdXTV5D8lKJRErvAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAEtJREFUCNety0kSgDAIRNGO8xwTR+T+97SFK/g3vIICYKGAV2pwVKpamxqq9dtXB/TqDRinmXOJXGKlkn1kajPt1PGjTuoy3SLyAC/otwiKgTl6jAAAAABJRU5ErkJggg==" width="9" height="19"/></svg>';
            break;
        }
        
        return stepIcon;
    })
});
