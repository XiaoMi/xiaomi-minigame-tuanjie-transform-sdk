using miqgame;
using System;
using UnityEngine;

internal class CheckFrame : MonoBehaviour
{
    private int frameCnt = 0;

    public void Update()
    {
        frameCnt++;
        if (frameCnt == 2)
        {
            QGSDKManagerHandler.Instance.HideLoadingPage();
            Destroy(this);
        }
    }
}

internal class HideLoadingPage : MonoBehaviour
{
    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
    private static void OnGameLaunch()
    {
        var gameObject = new GameObject("HideLoadingPage");
        gameObject.AddComponent<CheckFrame>();
        DontDestroyOnLoad(gameObject);
    }
}